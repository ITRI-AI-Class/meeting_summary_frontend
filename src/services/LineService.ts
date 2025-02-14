import api from "./api";

class LineService {
    login(uid:string) {
        return api.get(`/line/login`, {
            headers: {
                "X-User-Id": uid
            }
        });
    }
}

export default new LineService()