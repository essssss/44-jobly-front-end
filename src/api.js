import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Get a list of all companies -- filterable by name */

    static async getCompanies(data) {
        let res = await this.request("companies", data);
        return res.companies;
    }

    /** Get a list of all jobs -- filterable by name */

    static async getJobs(data) {
        let res = await this.request("jobs", data);
        return res.jobs;
    }

    /** Login route.  */

    static async loginUser(userData) {
        let token = await this.request("auth/token", userData, "post");
        return token;
    }

    /** Get full user details from decoded username */
    static async getUserInfo(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** sign up a new user */
    static async signUp(newUserData) {
        let token = await this.request("auth/register", newUserData, "post");
        return token;
    }
    /** edit a user's details */
    static async editProfile(username, userData) {
        let res = await this.request(`users/${username}`, userData, "patch");
        return res;
    }

    /** Apply to a job */
    static async applyToJob(username, jobId) {
        let res = await this.request(
            `users/${username}/jobs/${jobId}`,
            {},
            "post"
        );
        console.log(jobId);
        return res;
    }

    static async getJobById(id) {
        let res = await this.request(`jobs/${id}`);
        return res;
    }

    // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
