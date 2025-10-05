
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// ✅ Helper function — checks if a room is available
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0; // true = available
  } catch (error) {
    console.error("Error checking availability:", error.message);
    throw error;
  }
};

// ✅ API: Check room availability
export const checkAvailibilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    if (!room || !checkInDate || !checkOutDate) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ API: Create a new booking
// POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user?._id;

    if (!room || !checkInDate || !checkOutDate || !guests) {
      return res.json({ success: false, message: "Missing booking data" });
    }

    // 🔒 Check availability before booking
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    // 🏠 Get room + hotel info
    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    // 💰 Calculate total price
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    const totalPrice = roomData.pricePerNight * nights;

    // 🧾 Create booking
    await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API: Get all bookings for a specific user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user?._id;
    if (!user) return res.json({ success: false, message: "User not found" });

    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 }); // ✅ fixed `.toSorted` → `.sort`

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch user bookings" });
  }
};

// ✅ API: Get all bookings for the hotel owner
// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room user")
      .sort({ createdAt: -1 });

    // 📊 Stats
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({
      success: true,
      hotel: hotel.name,
      totalBookings,
      totalRevenue,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res.status(500).json({ success: false, message: "Failed to fetch hotel bookings" });
  }
};
