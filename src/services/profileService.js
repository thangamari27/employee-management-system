export const getProfile = async () => {
    return {
      firstName: "Tim",
      lastName: "Cook",
      email: "tcook@apple.com",
      phone: "(408) 996–1010",
      city: "New York",
      country: "America"
    };
  };
  
  export const updateProfile = async (profile) => {
    console.log("Updated Profile:", profile);
  };
  