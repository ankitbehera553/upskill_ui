// userServices/createUser.js

// Create User
export const CreateUser = async (newUser) => {
    try {
        const response = await fetch("http://localhost:8080/api/users/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            const error = await response.text();
            return { success: false, error };
        }

        const data = await response;
        return { success: true, data };

    } catch (err) {
        console.error("Create user error:", err);
        return { success: false, error: err.message };
    }
};

// Get User (Login)
export const getUser = async (newUser) => {
    const { email, password } = newUser;
    const url = `http://localhost:8080/api/users/getUserByEmail?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.text();
            return { success: false, error };
        }

        const data = await response.json();
        return { success: true, data };

    } catch (err) {
        console.error("Login error:", err);
        return { success: false, error: err.message };
    }
};
