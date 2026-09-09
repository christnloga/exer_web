/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { BiChevronDown } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const LanguageSelectorMobile = ({ languages, selectLanguage, setSelectLanguage, changeLanguage }) => {

    const { t, i18n } = useTranslation();
    const language = i18n.resolvedLanguage;

    return (
        <div className="flex flex-col w-full">
            <div className={`w-full relative overflow-hidden duration-150 group cursor-pointer bg-primary-300/5 active:bg-primary-300/20 px-2 py-6`}
            >
                <div className="flex items-center px-2"
                    onClick={() => selectLanguage == false ? setSelectLanguage(true) : setSelectLanguage(false)}>
                    <p className="font-semibold text-slate-700">Site language</p>
                    <div className="items-center justify-center w-5 h-5 rounded-full overflow-hidden ml-auto">
                        <img
                            src={'https://flagcdn.com/' + (language === 'en' ? 'gb' : language) + '.svg'}
                            alt={language}
                            className="object-cover h-full"
                        />
                    </div>
                    <BiChevronDown size={24} className={'ml-2 shrink-0 duration-150 ' + (selectLanguage === true ? 'rotate-180' : '')} />
                </div>
                <AnimatePresence initial={false}>
                    {selectLanguage &&
                        (
                            <motion.div
                                className='overflow-hidden mt-4'
                                // key={entry.id}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                                {languages.map((lang) => {
                                    return (
                                        <div key={lang.id} className="flex flex-col p-2 rounded-lg active:hover:bg-primary-300/20 duration-150"
                                            onClick={() => changeLanguage(lang.id)}>
                                            <div className="flex items-center">
                                                <div className="items-center justify-center w-5 h-5 rounded-full overflow-hidden mr-2">
                                                    <img
                                                        src={lang?.flag}
                                                        alt={lang?.name}
                                                        className="object-cover h-full"
                                                    />
                                                </div>
                                                <p className='block text-slate-700'>{lang.name}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default LanguageSelectorMobile