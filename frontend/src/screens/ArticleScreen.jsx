import dock from "../assets/dock.png";
import { FiPrinter } from "react-icons/fi";
import { CiShare1 } from "react-icons/ci";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ArticleScreen = () => {
    const socialSize = 45;
    const socialClass =
        "hover:cursor-pointer transform transition-all duration-150 hover:scale-[1.08]";

    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const secondaryLanguage = useSelector(
        (state) => state.language.secondaryLanguage
    );

    useEffect(() => {
        if (secondaryLanguage !== "Dual Language")
            setisSecondaryLangVisible(true);
        else setisSecondaryLangVisible(false);
    }, [secondaryLanguage]);

    return (
        <div className="mt-6">
            <div className="flex w-full space-x-5 items-center">
                <div className="flex justify-between w-11/12">
                    <h1 className="font-poppins italic text-darkExpansion">
                        {">"} Articles {">"} English {">"} Practice the Presence
                        of God
                    </h1>
                    <FiPrinter
                        size={28}
                        className="mr-2 hover:cursor-pointer"
                    />
                </div>
                <div
                    className={`w-1/12 flex items-center justify-end space-x-2 cursor-pointer hover:underline`}
                >
                    <h1 className="font-opensans text-xl">Share</h1>
                    <CiShare1 size={25} />
                </div>
            </div>
            <div className="flex w-full space-x-5 mt-4">
                {/* Article Section (80%) */}
                <div
                    className={`${
                        isSecondaryLangVisible ? "w-1/2" : "w-11/12"
                    } card-shadow-static rounded-[16px] transition-all duration-200`}
                >
                    <img
                        src={dock}
                        alt=""
                        className="rounded-t-[16px] image-shadow w-full"
                    />
                    <div className="py-5 px-2">
                        <h1 className="text-darkExpansion text-3xl font-bold mb-2">
                            Practice the Presence of God
                        </h1>
                        <div className="flex space-x-2">
                            <h1 className="text-gray-600 text-sm italic mb-6">
                                Aug. 19, 2024
                            </h1>
                            <HiOutlineSpeakerWave
                                size={20}
                                className="pt-[1px] hover:cursor-pointer"
                            />
                        </div>
                        <h1 className="text-darkExpansion text-lg">
                            God is present in our lives every moment of the day,
                            whether we recognize it or not. More filler words
                            here that have meaning and trail off into dots
                            okay... Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Vero perferendis suscipit velit
                            aperiam, sit natus enim nisi possimus soluta
                            inventore pariatur veritatis facilis aut incidunt
                            obcaecati molestias. Iure officiis dicta, consect
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Consequuntur harum est facilis recusandae
                            vitae, nobis perspiciatis dicta similique quis
                            expedita, quaerat culpa. Consequatur doloribus
                            praesentium iusto ipsam hic illo velit dolores
                            accusantium! Quas totam, recusandae natus nisi
                            dolores vitae nostrum inventore beatae perferendis
                            fugiat possimus distinctio alias debitis doloribus
                            eum aliquid nam, corrupti iste eveniet illum. Dicta
                            inventore quibusdam molestias placeat similique,
                            recusandae harum eaque nulla, tempora nostrum
                            voluptate quod nesciunt distinctio et ipsam, in
                            labore quaerat facilis saepe obcaecati deserunt
                            consequuntur neque qui! Iusto aliquid minus
                            delectus? Qui nostrum dolorem placeat reiciendis
                            fugiat accusantium hic totam dignissimos, natus
                            impedit vitae velit odit vel repellat, mollitia
                            quidem molestiae soluta autem quas cupiditate sit
                            delectus enim. Vero voluptatibus impedit quo magni
                            officia ullam, odio tempore eum accusantium ipsam
                            placeat modi quae enim vel dicta sapiente?
                            Accusantium placeat suscipit, sunt ea itaque
                            aspernatur libero odit sapiente quibusdam
                            voluptatibus eius cum voluptatem mollitia quos in
                            soluta aliquam deserunt autem, fugiat asperiores
                            esse excepturi? Sunt provident laborum quos,
                            accusantium nesciunt quod eum totam illum autem ea
                            odio, animi minima quibusdam doloremque nemo quia
                            eius ad ut praesentium. Sunt iusto dolores excepturi
                            officiis eveniet dolorem iure. Incidunt, maxime, est
                            dolorum ipsum laudantium architecto delectus at quod
                            temporibus esse debitis pariatur officiis maiores ut
                            harum ea nulla nam facere commodi optio quibusdam
                            dolorem perspiciatis praesentium earum? Alias ea
                            dolor quas modi ipsa. Quam illo tenetur adipisci
                            beatae asperiores itaque, excepturi atque reiciendis
                            ducimus quidem hic, earum aperiam nesciunt provident
                            saepe, inventore veritatis dicta qui molestiae
                            consequuntur minima odit quibusdam nobis? Enim unde
                            hic eius sed commodi, et nihil consectetur quo aut
                            cumque distinctio quaerat, esse sequi. Dolore
                            consequuntur laboriosam velit animi eveniet,
                            provident rem deserunt officiis ea illo ducimus
                            nihil corrupti magnam cum? Dicta quis iusto soluta
                            voluptatem delectus labore harum. Sint, architecto
                            eius accusantium inventore quam consectetur pariatur
                            excepturi tempore officia libero ut facere ipsum
                            autem? Officia recusandae id repudiandae iusto hic,
                            voluptate fugit ratione doloribus nesciunt expedita?
                            Perferendis tempore sed iusto quae fugiat molestiae
                            consequuntur? Corporis ducimus quisquam blanditiis
                            quaerat similique voluptate placeat distinctio
                            cumque incidunt, asperiores nisi exercitationem
                            aliquid labore recusandae ab, porro dolor magni quis
                            eos voluptates fuga, vero omnis! Distinctio
                            consequuntur exercitationem deserunt at quam
                            deleniti voluptatibus quaerat laudantium consectetur
                            maxime dolores labore doloremque sequi rerum
                            laboriosam rem suscipit temporibus corrupti
                            blanditiis, excepturi ea a. Reprehenderit tempore
                            consectetur debitis, minus aut sapiente, sit
                            praesentium nam amet adipisci rem quod magni ipsum
                            vel cumque atque. Dignissimos voluptas sequi cumque
                            voluptate unde itaque voluptatibus rerum aperiam
                            provident dolorum consectetur similique sunt fugit
                            fugiat, laudantium id, ipsam maiores. Placeat
                            recusandae sint, quisquam maiores vitae mollitia
                            deserunt sequi veniam possimus a quam expedita porro
                            nostrum quod, debitis repellat. Vero commodi fugit,
                            illum provident praesentium perspiciatis eius.
                            Commodi repudiandae nisi nobis quae dignissimos
                            impedit accusamus cumque iste. Quos optio expedita
                            est laboriosam voluptates nemo in dolorem assumenda
                            quis nobis earum quibusdam modi excepturi
                            reprehenderit qui, similique, quisquam, labore
                            reiciendis iusto alias eius esse voluptate minus
                            suscipit! Eaque quaerat tenetur voluptatem dolore
                            nobis saepe quae exercitationem commodi voluptate
                            labore ab ad corporis quam iusto perferendis quo,
                            quos, delectus cum, blanditiis animi. Architecto
                            ratione autem, magnam omnis earum ducimus recusandae
                            eius unde, quos natus alias, officiis cumque rem. Id
                            nesciunt, quisquam distinctio impedit iure error
                            architecto molestiae consectetur alias possimus
                            soluta quis explicabo magni totam neque laborum
                            perferendis, ipsa autem quas? Illum similique
                            commodi assumenda hic qui iste incidunt quam.
                            Temporibus rem laborum dicta modi exercitationem
                            optio ducimus? Inventore reiciendis iure magni odit
                            blanditiis aliquid nulla enim cumque ipsa sint! Odit
                            sapiente atque maiores dolorem assumenda ab,
                            voluptatem esse quaerat molestiae, ducimus alias
                            voluptatibus nobis quis commodi saepe provident
                            aperiam harum dolor unde aspernatur error laboriosam
                            ipsum similique! Quaerat voluptates dolores quia,
                            maxime suscipit veniam placeat dolorem, ipsum optio
                            accusantium laborum dignissimos deserunt blanditiis
                            inventore. Repudiandae illo itaque at dolore
                            corrupti similique, veritatis pariatur iure commodi
                            eos atque, nisi voluptas minima illum nam quam,
                            reprehenderit sint perspiciatis ducimus distinctio
                            nulla earum deserunt! Saepe repudiandae dignissimos
                            ipsam vitae temporibus iure labore, similique
                            deserunt. Temporibus error eius ex exercitationem
                            vitae debitis non nulla. Quibusdam itaque,
                            laboriosam, perferendis ab earum recusandae quo
                            autem error aperiam consectetur mollitia tempore
                            delectus natus consequatur vel accusantium sint
                            officia possimus nam debitis dolores. Tempora,
                            aliquid accusamus repellat quod deleniti eligendi
                            iusto tenetur qui illum ducimus sint quas. Ullam
                            iusto ex neque provident ipsam itaque nobis dolores,
                            sunt molestias laudantium, rem quod dolorem harum
                            necessitatibus repellendus quaerat similique ducimus
                            dolor facere reprehenderit nisi expedita consectetur
                            eius? Illum suscipit repellat iste, explicabo, ullam
                            earum autem voluptatum nisi quo saepe vitae!
                            Accusamus, atque dignissimos? Culpa autem quo,
                            eveniet incidunt nulla adipisci? Porro temporibus
                            alias minima nobis aliquid recusandae iure, atque
                            et! Quam nostrum veritatis maxime facilis mollitia
                            sed dolore, repudiandae iusto expedita, beatae
                            laborum temporibus illo at, tenetur cumque possimus
                            amet harum exercitationem architecto? Architecto
                            quod magnam culpa unde facilis! Ipsum harum,
                            adipisci quod soluta aliquam sint distinctio numquam
                            ab ex eaque accusamus fuga laborum sunt? Nemo quas
                            sequi quia, numquam explicabo suscipit molestiae
                            vitae. Cum corporis vel possimus debitis error ut
                            quae veniam incidunt numquam, dolore unde ducimus
                            molestias amet facilis excepturi, dignissimos
                            voluptatibus dicta exercitationem repellat. Officia
                            minima dicta, officiis minus consequatur tempore
                            modi labore! Reiciendis voluptatum quae odit vero.
                            Laboriosam natus, esse aperiam, voluptatum labore
                            necessitatibus dolores eaque blanditiis cum unde
                            corrupti dolor! Tenetur illum rerum dignissimos,
                            numquam architecto consequatur corporis quo quaerat?
                            Consequuntur a quibusdam laborum neque accusamus
                            corporis inventore odit dolorum vero, nisi sapiente
                            mollitia quisquam molestias magnam dolores eaque
                            exercitationem dignissimos, facilis veritatis!
                            Obcaecati adipisci quos at provident aut ipsam, nisi
                            ab voluptatibus aliquam exercitationem sint in
                            sapiente eum dolore repudiandae corrupti dolores
                            placeat veniam blanditiis magni quod praesentium
                            rerum perferendis impedit? Atque ex architecto,
                            similique soluta distinctio est at fugiat velit
                            commodi magni fuga consectetur? Quis quaerat
                            eligendi corrupti distinctio officiis dicta laborum
                            maiores! Possimus in neque magnam molestias placeat
                            ullam praesentium amet repellendus expedita eos
                            aperiam repellat nulla veniam unde, voluptate
                            nesciunt pariatur explicabo, odio cumque ea eius
                            laudantium fugit non natus. Adipisci, nisi tempora
                            doloremque quasi illum amet quas?
                        </h1>
                    </div>
                </div>

                {/* Card Section (20%) */}
                <div className="w-1/12 card-shadow-static rounded-[16px] p-1 h-[400px]">
                    <h2 className="text-darkExpansion text-xl font-bold text-center">
                        Connect
                    </h2>
                    <p className="text-darkExpansion mt-4 flex flex-col items-center justify-center mx-auto space-y-3">
                        <FaSquareXTwitter
                            size={socialSize}
                            className={socialClass}
                        />
                        <FaYoutube size={socialSize} className={socialClass} />
                        <FaInstagram
                            size={socialSize}
                            className={socialClass}
                        />
                        <FaFacebookSquare
                            size={socialSize}
                            className={socialClass}
                        />
                        <FaLinkedin size={socialSize} className={socialClass} />
                        <FaPinterest
                            size={socialSize}
                            className={socialClass}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
