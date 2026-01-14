import { useState } from "react"
import { HiOutlineMenuAlt2 } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";

export const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleScroll = (id: string, offset: number = 0) => {
        const section = document.getElementById(id);
        if (section) {
            const top = section.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <header className="w-screen h-18 flex items-center justify-between bg-black/50 fixed top-0 px-4 md:px-12 py-3 z-99">
            <button className="flex flex-col items-center" onClick={() => handleScroll("hero-fold")}>
                <h2 className="text-3xl md:text-4xl translate-y-2 text-[#C3973B]">Villa Glow</h2>
                <h4 className="text-white translate-x-1 text-sm">Pintando no escuro</h4>
            </button>
            <div className="flex items-center gap-2">
                <a
                    target="_blank"
                    href="https://www.sympla.com.br/evento/villa-glow-pintando-no-escuro/3187225?_gl=1*1k6tqsb*_gcl_au*OTkwMzcyMzkzLjE3NjEyNTU3NDMuMTQwNzU4MzAwNS4xNzYxMzI4NTE0LjE3NjEzMjg2MDk.*_ga*MTQ5MTg4MDgyOC4xNzYxMjU1NzQ0*_ga_KXH10SQTZF*czE3NjEzMjcwMDMkbzUkZzEkdDE3NjEzMjg5ODMkajI2JGwwJGgxNDY0MTM3ODMz"
                    className="px-5 pt-1 pb-1.5 rounded-full text-lg font-semibold text-[#030332] bg-[#C3973B] text-bartex"
                >
                    Ingressos
                </a>
                <button className="md:hidden" onClick={() => { setOpenMenu(true) }}>
                    <HiOutlineMenuAlt2 className="text-white text-3xl" />
                </button>
                <nav className="hidden md:block">
                    <ul className="flex gap-4 items-start font-semibold text-white pl-2">
                        <li onClick={() => handleScroll("first-fold", -100)} className="cursor-pointer">Experiência</li>
                        <li onClick={() => handleScroll("second-fold")} className="cursor-pointer">Informações</li>
                        <li onClick={() => handleScroll("third-fold")} className="cursor-pointer">Localização</li>
                    </ul>
                </nav>
            </div>
            {openMenu && <div className="w-screen md:hidden h-screen top-0 left-0 fixed bg-black/50" />}
            <nav className={`${openMenu ? '' : 'translate-x-50'} w-[180px] md:hidden h-screen pt-5 px-3 bg-[#0A0533] fixed top-0 right-0 transition-all duration-500`}>
                <button className="absolute top-5 right-4" onClick={() => setOpenMenu(false)}>
                    <IoMdClose className="text-white text-3xl " />
                </button>
                <a
                    target="_blank"
                    href="https://www.sympla.com.br/evento/villa-glow-pintando-no-escuro/3261080"
                    className="px-5 pt-1 pb-1.5 rounded-full text-lg font-semibold text-[#030332] bg-[#C3973B] text-bartex"
                >
                    Ingressos
                </a>
                <ul className="flex flex-col gap-4 items-start font-semibold text-white pl-2 pt-6">
                    <li
                        onClick={
                            () => {
                                handleScroll("first-fold")
                                setOpenMenu(false);
                            }
                        }
                        className="cursor-pointer"
                    >
                        Experiência
                    </li>
                    <li onClick={
                        () => {
                            handleScroll("second-fold", +500)
                            setOpenMenu(false);
                        }
                    }
                        className="cursor-pointer"
                    >
                        Informações
                    </li>
                    <li
                        onClick={
                            () => {
                                handleScroll("third-fold")
                                setOpenMenu(false);
                            }
                        }
                        className="cursor-pointer"
                    >
                        Localização
                    </li>
                </ul>
            </nav>
        </header>
    );
};
