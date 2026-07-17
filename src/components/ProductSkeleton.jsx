


const ProductSkeleton = () =>{

    return (
        <div className="p-6">

            {/* header */}
            <div className="mb-6">
                <div className="shimmer h-10 w-52 rounded-xl"></div>
            </div>


            {/* main */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* left */}
                <div className="space-y-4">

                    {/* Main Image */}
                    <div className="shimmer h-[450px] rounded-3xl"></div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-4 gap-3">
                        {[1,2,3,4].map((item)=>(
                            <div key={item}
                                    className="shimmer h-20 rounded-xl">

                            </div>
                        ))}


                    </div>

                    {/* Slider */}
                    <div className="shimmer h-[430px] rounded-3xl"></div>

                </div>

                {/* right */}

                <div className="space-y-6">
                    {/* Card Overview */}
                    <div className="rounded-3xl bg-amazon-surface p-8 shadow">

                    <div className="shimmer h-4 w-24 rounded"></div>

                    <div className="mt-4 shimmer h-8 w-2/3 rounded"></div>

                <div className="mt-6 space-y-3">

                    <div className="shimmer h-4 rounded"></div>

                    <div className="shimmer h-4 rounded"></div>

                    <div className="shimmer h-4 w-4/5 rounded"></div>

                </div>

            </div>

                {/* Price Card */}
            <div className="grid grid-cols-2 gap-4">

                    {[1,2,3,4].map((item)=>(

                <div
                    key={item}
                    className="rounded-2xl bg-amazon-surface p-5 shadow"
                >

                <div className="shimmer h-3 w-16 rounded"></div>

                <div className="mt-4 shimmer h-7 w-20 rounded"></div>

                </div>

                ))}

            </div>

                {/* Tags */}
            <div className="rounded-3xl bg-amazon-surface p-7 shadow">

                <div className="shimmer h-5 w-20 rounded"></div>

                <div className="mt-5 flex gap-3">

                        {[1,2,3].map((item)=>(

                    <div
                        key={item}
                        className="shimmer h-8 w-20 rounded-full"
                    ></div>

                    ))}

                </div>

            </div>

            {/* Category */}
            <div className="rounded-3xl bg-amazon-surface p-7 shadow">

                <div className="shimmer h-5 w-32 rounded"></div>

                <div className="mt-5 shimmer h-4 w-2/3 rounded"></div>

            </div>

            {/* Highlights */}
            <div className="rounded-3xl bg-amazon-surface p-7 shadow">

                <div className="shimmer h-5 w-28 rounded"></div>

                <div className="mt-5 space-y-3">

                    <div className="shimmer h-4 rounded"></div>

                    <div className="shimmer h-4 rounded"></div>

                    <div className="shimmer h-4 w-3/4 rounded"></div>

                </div>

            </div>





                </div>
            </div>

        </div>

    );

};

export default ProductSkeleton;