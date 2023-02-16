import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await User.findOne({ email }); //existingUser

        if(!result) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, result.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect Password'});

        const token = jwt.sign({ email: result.email, id: result._id }, 'testSecret', { expiresIn: '1h' })

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const signup = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    //console.log('body',req.body);

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists" });

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

        //hash passwords
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}`})
        const token = jwt.sign({ email: result.email, id: result._id }, 'testSecret', { expiresIn: '1h' });

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong in sign up' })
    }
}