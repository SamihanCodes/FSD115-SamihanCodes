import api from "./axios";

// ✅ Get all listings (buyers)
export const getAllListings = () => {
  return api.get("/listings");
};

// ✅ Get seller's listings
export const getMyListings = () => {
  return api.get("/listings/my");
};

// ✅ Create listing (with images)
export const createListing = (formData) => {
  return api.post("/listings", formData, {
     headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Update listing
export const updateListing = (id, data) => {
  return api.put(`/listings/${id}`, data);
};

// ✅ Update listing status
export const updateListingStatus = (id, status) => {
  return api.patch(`/listings/${id}/status`, { status });
};

// ✅ Search listings
export const searchListings = (params) => {
  return api.get("/listings/search", { params });
};
export const deleteListing = (id) =>
  api.delete(`/listings/${id}`);
