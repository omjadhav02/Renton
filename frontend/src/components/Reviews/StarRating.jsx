import { useState } from "react"
import { IoStar, IoStarOutline } from "react-icons/io5";

function StarRating({ rating, setRating }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-2 text-2xl">
            {[1,2,3,4,5].map((star) => (
                <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`cursor-pointer transition-transform duration-150
                        ${(hover || rating) >= star
                            ? "text-yellow-400 scale-110"
                            : "text-gray-300"
                        }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default StarRating;