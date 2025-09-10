import User from "../models/User.js";

/**
 * Find or create a user in a single database call
 * @param {string} email - User's email
 * @param {string} name - User's name
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Returns user object with isNew flag
 */

export const findOrCreateUser = async (email, name, password, session = null) => {
  try {
    // Generate a unique 5-digit numeric display_id for new users
    const displayId = Math.floor(10000 + Math.random() * 90000).toString();

    // Prepare user data for new user creation
    const userData = {
      name: name,
      email: email,
      password: password, // Note: In production, you should hash this password
      displayId: displayId,
    };

    // Use findOneAndUpdate with upsert - same pattern as device service
    const user = await User.findOneAndUpdate(
      { email: email }, // filter
      { $setOnInsert: userData }, // only set data if inserting (creating new)
      {
        upsert: true, // create if doesn't exist
        new: true, // return the updated/created document
        runValidators: true, // run schema validations
        session, // add session for transaction support
      }
    );

    return user;
  } catch (error) {
    // Handle duplicate key errors (in case display_id collision occurs)
    if (error.code === 11000 && error.keyPattern?.displayId) {
      // Retry with a new display_id if there's a collision
      return findOrCreateUser(email, name, password, session);
    }
    throw error;
  }
};
