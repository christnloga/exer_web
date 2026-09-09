const Header = ({ openModal }) => {

    return (
        <header className='hero relative overflow-hidden bg-primary-300 h-screen lg:h-[950px] w-full'>
            <img className="absolute w-[200px] top-0 bottom-0 left-0 z-30 mix-blend-screen" src="/images/homepage/Rectangle-top-left.png" alt="" />
            <img className="absolute w-[200px] -top-10 bottom-0 -left-10 z-30 mix-blend-screen animate-pulse duration-1000" src="/images/homepage/Rectangle-top-left.png" alt="" />
            <img className="absolute bottom-0 left-0 right-0 w-[700px] mix-blend-multiply" src="/images/homepage/Rectangle-bottom-left.png" alt="" />
            <img className="absolute bottom-0 right-0 w-[1270px] mix-blend-screen" src="/images/homepage/Hero_illustartion-platform.png" alt="" />
            <div className="absolute bottom-0 right-0 mix-blend-hue w-[1270px] h-[1270px] bg-primary-300 z-20"></div>
            <div className="flex h-full py-28 lg:py-0">
                <div className="h-full mx-auto lg:max-w-6xl lg:overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        <div className="z-40 px-4 my-auto space-y-8 md:col-span-1 lg:px-0">
                            <h1 className="text-3xl leading-[60px] font-bold text-center text-white md:text-left md:text-6xl lg:mb-7">
                                MS-EXPERT <br /> « L'expertise d'une fiduciaire  & la liberté du digital. »
                            </h1>
                            <p className="text-sm text-center text-white lg:text-left lg:text-base">
                                Au-delà du bilan et des obligations fiscale, notre fiduciaire digitale offre des conseils sur mesure pour tout type d'entreprise  : startups, sociétés de management, Horeca, secteur médical, ASBL et bien d'autres. Nous vous guidons dans la création et l'optimisation de votre réussite.
                            </p>
                            <div className="flex justify-center space-x-2 md:justify-start">
                                <a onClick={openModal} className="px-4 py-3 text-sm font-medium duration-150 bg-white rounded-lg cursor-pointer active:brightness-90 text-primary-300 hover:bg-white/90 hover:text-primary-300 lg:text-base transition-color lg:px-6">
                                    Demandez un devis en ligne
                                </a>
                                {/* <button onClick={openModal} className="px-4 py-3 text-sm font-medium text-white duration-150 bg-transparent border border-white rounded-lg hover:bg-white/10 lg:text-base transition-color lg:px-6">
                                    Contact Us
                                </button> */}
                            </div>
                        </div>
                        <div className="md:col-span-1 lg:block">
                            <img
                                className="absolute bottom-0 right-0 w-[720px] scale-110 lg:scale-100"
                                src='/images/homepage/Hero-Illustrations.svg'
                                alt="hero image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header