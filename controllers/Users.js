class User {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.activity = {
            programs: [],
            tools: [],
            authoring_templates: []
        };
    }

    setRole(user, role) {
        if (!user.role) {
            user.role = role;
        }

        return new Error('User already has a role.')
    }

    getRole(user) {
        if (user.role) {
            return user.role
        }

        return null;
    }

    changeRole(user, role) {
        user.role = role;
    }    

}

module.exports = User;
