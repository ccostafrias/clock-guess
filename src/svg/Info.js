import React from "react";

export default function Info({className, onClick}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} className={className} fill="currentColor" viewBox="0 0 512 512"><path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 16v104h28a16 16 0 010 32z"/></svg>
    )
}