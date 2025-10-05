// GET /api/user/
export const getUserData = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const role = user.role || "user";
    const recentSearchedCities = user.recentSearchedCities || [];
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





// Store user recent searched cities
export const storeRecentSreachCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    if (!recentSearchedCity) {
      return res.status(400).json({ success: false, message: "City is required" });
    }

    // Ensure the array exists
    if (!Array.isArray(user.recentSearchedCities)) {
      user.recentSearchedCities = [];
    }

    // Remove city if already present to avoid duplicates
    user.recentSearchedCities = user.recentSearchedCities.filter(
      (city) => city !== recentSearchedCity
    );

    // Keep only the last 2 if already 3
    if (user.recentSearchedCities.length >= 3) {
      user.recentSearchedCities.shift();
    }

    user.recentSearchedCities.push(recentSearchedCity);

    await user.save();
    res.json({ success: true, message: "City added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};