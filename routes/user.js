import express from 'express';
import { getMyProfile, login, logout, register} from '../controllers/user.js';
import { User } from '../models/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);



router.get("/me",isAuthenticated,getMyProfile);


/*Above line code can also written like this
router.get("/userid/:id", searchUser);
router.put("/userid/:id", updateUser);
router.delete("/userid/:id", deleteUser);
*/ 

export default router;