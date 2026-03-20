import { useState } from "react";

function StarRating({ rating, setRating }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1 text-2xl cursor-pointer">
            {[1,2,3,4,5].map((star) => (
                <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={
                        (hover || rating) >= star
                            ? "text-yellow-500"
                            : "text-gray-300"
                    }
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default StarRating;