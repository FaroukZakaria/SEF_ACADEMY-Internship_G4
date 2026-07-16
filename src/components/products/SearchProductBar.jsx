import { useState } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

const CATEGORY_OPTIONS = [
    { value: "", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "phones", label: "Phones"},
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home" },
    { value: "beauty", label: "Beauty" },
    { value: "sports", label: "Sports" },
];

const SearchProductBar = ({onSearch}) => {
    const [query, setQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    const handleSearch = () => {
        onSearch({ query: query.trim(), category, subcategory: subcategory.trim() });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return(
        <div className="rounded-3xl border border-amazon-border bg-amazon-surface w-86/100 mx-auto my-5 p-3 overflow-hidden">
            <div className="flex gap-3 items-center h-16 px-6">
                <div className="relative w-8/10">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amazon-textLight" />
                    <input type="text" placeholder="Search Products..." className="rounded-2xl bg-amazon-bg/50 py-4 pl-10 pr-4 w-full"
                        value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                    />
                </div>
                <button 
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="text-sm font-medium text-amazon-textDark border border-amazon-border bg-amazon-bg/60 rounded-xl py-4 h-8/10 w-24 cursor-pointer hover:bg-amazon-bg
                     flex items-center justify-center gap-1.5" 
                >
                    <TbAdjustmentsHorizontal /> Filters
                </button>
                <button 
                    onClick={handleSearch}
                    className="text-sm font-semibold text-amazon-textDark border border-amazon-border bg-amazon-orange rounded-xl py-4 h-8/10 w-28 cursor-pointer hover:bg-amazon-orangeHover
                     flex items-center justify-center gap-1.5"
                > 
                    <FiSearch /> Search
                </button>
            </div>

            <div className={`grid transition-all duration-300 ease-out ${showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="flex gap-4 px-6 py-5">
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                            className="rounded-xl border border-amazon-border bg-amazon-bg/50 px-4 py-2.5 text-sm w-1/2"
                        >
                            {CATEGORY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="e.g. smartphones" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}
                            onKeyDown={handleKeyDown} className="rounded-xl border border-amazon-border bg-amazon-bg/50 px-4 py-2.5 text-sm w-1/2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchProductBar;