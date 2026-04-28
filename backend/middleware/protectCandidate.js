import jwt from "jsonwebtoken";

export const protectCandidate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "CANDIDATE") {
            return res.status(403).json({ message: "Access denied" });
        }

        req.candidateId = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
