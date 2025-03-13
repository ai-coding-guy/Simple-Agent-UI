import { FaLink, FaRegFileLines, FaGear, FaRegMessage, FaBars } from "react-icons/fa6";

const Sidebar = () => {
    return (
        <div className="md:min-h-[100dvh] flex flex-row md:flex-col items-center justify-between border-r border-gray-300 p-3 bg-gray-100">
            <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="hidden md:flex bg-neutral-800 rounded-full text-white size-11 flex items-center justify-center text-center font-bold mb-2">
                        UI
                    </div>
                    <div className="flex md:hidden">
                        <FaBars></FaBars>
                    </div>
                </div>
                <div className="hidden md:flex flex-col items-center gap-2">
                    <div className="p-2 text-gray-500 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-md size-10">
                        <FaRegMessage className="size-5"></FaRegMessage>
                    </div>
                    <div className="p-2 text-gray-500 hover:bg-gray-300 flex items-center justify-center rounded-md size-10">
                        <FaRegFileLines className="size-5"></FaRegFileLines>
                    </div>
                    <div className="p-2 text-gray-500 hover:bg-gray-300 flex items-center justify-center rounded-md size-10">
                        <FaLink className="size-5"></FaLink>
                    </div>
                    <div className="p-2 text-gray-500 hover:bg-gray-300 flex items-center justify-center rounded-md size-10">
                        <FaGear className="size-5"></FaGear>
                    </div>
                </div>
            </div>
            <div>
                <div className="p-2 text-white bg-violet-500 hover:bg-violet-600 flex items-center justify-center rounded-md size-10">
                    T
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
