/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkScroll, animateScroll as scroll } from 'react-scroll';
import {
    FiAlignLeft,
    FiArrowRight,
    FiCheckSquare,
    FiDatabase,
    FiHelpCircle,
    FiLogIn,
    FiMenu,
    FiPlusSquare,
    FiSmartphone,
    FiStar,
    FiUser,
    FiX,
} from 'react-icons/fi';
import { SlGraduation } from 'react-icons/sl';
import {
    Navbar,
    Typography,
    Button,
    MenuItem,
    Collapse,
    Carousel,
    IconButton,
} from '@material-tailwind/react';
import logo from '../../images/IFSolve-logo.svg';
// import featrueOne from '../../images/featureOne.jpg';
import ctaImg from '../../images/cta.jpg';
// import poster from '../../images/poster.png';
import carouselImage1 from '../../images/carousel_1.jpg';
import carouselImage2 from '../../images/carousel_2.jpg';
import carouselImage3 from '../../images/carousel_3.jpg';
import carouselImage4 from '../../images/carousel_4.jpg';
import LogoSuap from '../../images/logo-suap.svg';

// import promoVideo from '../../videos/promo_video.mp4';

export default function Landing() {
    return (
        <div className="flex flex-col min-h-screen text-dark-100">
            <MyNavbar />
            <Hero />
            <ProfessorArea />
            <AlunoArea />
            <CTA />
            <FAQ />
            <Footer />
        </div>
    );
}

function MyNavbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
        {
            icon: <SlGraduation />,
            text: 'Sou professor',
            link: 'professor',
        },
        {
            icon: <FiUser />,
            text: 'Sou aluno',
            link: 'aluno',
        },
        {
            icon: <FiHelpCircle />,
            text: 'Perguntas frequentes',
            link: 'faq',
        },
    ];

    return (
        <Navbar className="w-11/12 md:w-10/12 xl:w-4/6 fixed inset-x-1/2 -translate-x-1/2 top-2 z-10 text-dark-100">
            <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 w-full">
                <LinkScroll to="hero" spy smooth offset={-90}>
                    <img src={logo} alt="Logo do IFSolve" className="h-5 cursor-pointer" />
                </LinkScroll>
                <div className="hidden md:flex flex-row gap-6">
                    {navItems.map((item) => (
                        <MenuItem className="whitespace-nowrap">
                            <LinkScroll
                                to={item.link}
                                spy
                                smooth
                                offset={-90}
                                className="flex flex-row gap-2 items-center"
                            >
                                {item.icon}
                                {item.text}
                            </LinkScroll>
                        </MenuItem>
                    ))}
                </div>
                <IconButton
                    color="blue-gray"
                    variant="text"
                    className="block md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {!open ? <FiMenu /> : <FiX />}
                </IconButton>

                <Link to="/login" className="hidden md:block">
                    <Button color="teal" className="flex flex-row items-center gap-2">
                        Entrar
                        <FiLogIn className="text-lg" />
                    </Button>
                </Link>
            </div>

            <Collapse open={open} className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <MenuItem>
                        <LinkScroll
                            to={item.link}
                            spy
                            smooth
                            offset={-90}
                            onClick={() => setOpen(false)}
                            className="flex flex-row gap-2 items-center"
                        >
                            {item.icon}
                            {item.text}
                        </LinkScroll>
                    </MenuItem>
                ))}
                <Link to="/login">
                    <Button color="teal" className="w-full">
                        Entrar
                    </Button>
                </Link>
            </Collapse>
        </Navbar>
    );
}

function Hero() {
    const items = [
        {
            image: carouselImage1,
            header: 'Destaque-se como professor inovador',
            paragraph: 'Ajudamos você a aplicar atividades para seus alunos.',
            link: 'professor',
        },
        {
            image: carouselImage2,
            header: 'Resolva suas atividades acadêmicas',
            paragraph: 'Ajudamos você a estudar para atividades',
            link: 'aluno',
        },
    ];

    return (
        <Carousel
            id="hero"
            className="w-full h-screen bg-dark-100"
            autoplayDelay={9000}
            autoplay
            loop
        >
            {items.map((item) => (
                <div className="relative h-full w-full">
                    <img
                        src={item.image}
                        alt={item.header}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute top-0 left-0 h-full w-full bg-black/75">
                        <div className="w-11/12 md:w-10/12 xl:w-4/6 h-full mx-auto flex flex-col items-center justify-center text-white gap-4">
                            <Typography
                                variant="h1"
                                className="w-full text-center text-6xl md:text-7xl font-marck"
                            >
                                {item.header}
                            </Typography>
                            <Typography variant="text" className="text-center">
                                {item.paragraph}
                            </Typography>
                            <div className="flex flex-row gap-2 mt-12">
                                <Link to="/login">
                                    <Button
                                        color="teal"
                                        className="flex justify-center items-center gap-4"
                                    >
                                        Entrar com
                                        <img src={LogoSuap} className="h-4" alt="Logo do suap" />
                                    </Button>
                                </Link>
                                <LinkScroll to={item.link} spy smooth offset={-90}>
                                    <Button
                                        variant="text"
                                        color="white"
                                        className="flex flex-row gap-2 items-center"
                                    >
                                        Conhecer
                                        <FiArrowRight className="text-lg" />
                                    </Button>
                                </LinkScroll>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

function ProfessorArea() {
    return (
        <div id="professor" className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto my-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img
                    src={carouselImage3}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="flex flex-col items-start gap-2">
                    <Typography variant="h2">Simplifique suas avaliações</Typography>
                    <Typography variant="text">
                        Maximize o seu tempo e melhore a experiência de avaliação dos seus alunos.
                    </Typography>
                    <Link to="/login" className="flex items-center gap-2 mb-12 text-teal-600">
                        <Typography variant="h6">Entrar com SUAP</Typography>
                        <FiArrowRight />
                    </Link>
                    <div className="flex flex-col items-start gap-2 mb-6">
                        <div className="p-2 bg-teal-100 text-teal-800 text-xl rounded-lg">
                            <FiPlusSquare />
                        </div>
                        <Typography variant="h5">Crie suas próprias questões</Typography>
                        <Typography variant="text">
                            Cadastre questões personalizadas alinhadas ao seu currículo, oferecendo
                            controle total sobre suas avaliações.
                        </Typography>
                    </div>
                    <div className="flex flex-col items-start gap-2 mb-6">
                        <div className="p-2 bg-deep-purple-100 text-deep-purple-800 text-xl rounded-lg">
                            <FiDatabase />
                        </div>
                        <Typography variant="h5">Acesso a banco de questões</Typography>
                        <Typography variant="text">
                            Explore um amplo banco de questões gratuito, classificado por disciplina
                            e nível de dificuldade, para criar avaliações diversificadas
                            rapidamente.
                        </Typography>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <div className="p-2 bg-light-blue-100 text-light-blue-800 text-xl rounded-lg">
                            <FiCheckSquare />
                        </div>
                        <Typography variant="h5">Fácil aplicação de avaliações</Typography>
                        <Typography variant="text">
                            Cadastre questões personalizadas alinhadas ao seu currículo, oferecendo
                            controle total sobre suas avaliações.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AlunoArea() {
    return (
        <div id="aluno" className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto my-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start gap-2">
                    <Typography variant="h2">Domine seu futuro acadêmico</Typography>
                    <Typography variant="text">
                        Desafie-se e supere seus limites com a nossa plataforma de estudos.
                    </Typography>
                    <Link to="/login" className="flex items-center gap-2 mb-12 text-teal-600">
                        <Typography variant="h6">Entrar com SUAP</Typography>
                        <FiArrowRight />
                    </Link>

                    <div className="flex flex-col items-start gap-2 mb-6">
                        <div className="p-2 bg-teal-100 text-teal-800 text-xl rounded-lg">
                            <FiAlignLeft />
                        </div>
                        <Typography variant="h5">Diversidade de questões</Typography>
                        <Typography variant="text">
                            Aprenda de forma prática e eficiente, explorando nossa vasta biblioteca
                            de perguntas do nosso banco de questões.
                        </Typography>
                    </div>
                    <div className="flex flex-col items-start gap-2 mb-6">
                        <div className="p-2 bg-deep-purple-100 text-deep-purple-800 text-xl rounded-lg">
                            <FiStar />
                        </div>
                        <Typography variant="h5">
                            Avalie seu progresso, alcance o sucesso!
                        </Typography>
                        <Typography variant="text">
                            Receba feedback do professor e identifique áreas de melhoria. Prepare-se
                            para exames e provas com nossas quesõtes. Seu sucesso acadêmico começa
                            aqui
                        </Typography>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <div className="p-2 bg-light-blue-100 text-light-blue-800 text-xl rounded-lg">
                            <FiSmartphone />
                        </div>
                        <Typography variant="h5">Estude em movimento</Typography>
                        <Typography variant="text">
                            Acesse nossa plataforma em qualquer dispositivo. Nossa plataforma
                            responsiva se adapta ao seu estilo de vida agitado.
                        </Typography>
                    </div>
                </div>
                <img
                    src={carouselImage4}
                    alt=""
                    className="w-full h-full object-cover rounded-lg place-self-start order-first md:order-last"
                />
            </div>
        </div>
    );
}

function CTA() {
    return (
        <div className="w-full relative mb-24">
            <img
                src={ctaImg}
                alt=""
                className="w-full h-full object-cover absolute z-[-1] brightness-50"
            />
            <div className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto py-12 aspect-[21/9] flex flex-col justify-center items-center">
                <Typography variant="h2" className="text-center w-full md:w-4/5 text-white">
                    Transforme a forma como você avalia seus alunos hoje mesmo!
                </Typography>
                <Typography className="text-center w-full md:w-4/5 mb-12 text-dark-5">
                    Experimente o IFSolve gratuitamente e descubra como simplificar sua rotina
                    acadêmica. Não perca tempo! Clique aqui para começar.
                </Typography>
                <Link to="/login">
                    <Button color="teal">Começar agora</Button>
                </Link>
            </div>
        </div>
    );
}

function FAQ() {
    const AccordionItems = [
        {
            header: 'Como faço para me cadastrar no IFSolve?',
            body: 'O acesso ao IFSolve é simples e rápido! Basta acessar a página de login e digitar sua matricula e senha do suap. Em seguida, você terá acesso imediato a todas as funcionalidades do IFSolve',
        },
        {
            header: 'Posso acessar o IFSolve de qualquer dispositivo?',
            body: 'Sim, o IFSolve é compatível com dispositivos móveis e desktops. Você pode acessar a plataforma a partir de qualquer lugar, a qualquer hora, desde que tenha uma conexão com a internet',
        },
        {
            header: 'Posso cancelar minha assinatura a qualquer momento?',
            body: 'Sim, você pode cancelar sua assinatura do IFSolve a qualquer momento, sem nenhuma taxa adicional. Basta acessar suas configurações de conta e solicitar o cancelamento. No entanto, lembramos que ao cancelar, você perderá o acesso às funcionalidades exclusivas da plataforma',
        },
    ];
    return (
        <div id="faq" className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto mb-12">
            <Typography variant="h3" className="mb-8 text-teal-700">
                Perguntas frequentes
            </Typography>
            <div className="divide-y divide-dark-10">
                {AccordionItems.map((item) => (
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 xl:gap-8 py-8">
                        <Typography variant="h6" className="col-span-2 text-dark-100">
                            {item.header}
                        </Typography>
                        <Typography variant="paragraph" className="col-span-4 text-dark-80">
                            {item.body}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Footer() {
    const navItems = [
        {
            icon: <SlGraduation />,
            text: 'Sou professor',
            link: 'professor',
        },
        {
            icon: <FiUser />,
            text: 'Sou aluno',
            link: 'aluno',
        },
        {
            icon: <FiHelpCircle />,
            text: 'Perguntas frequentes',
            link: 'faq',
        },
    ];

    return (
        <footer className="w-full border-t border-dark-10">
            <div className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto">
                <div className="flex flex-col justify-between items-center py-8 md:flex-row">
                    <LinkScroll to="hero" spy smooth offset={-90}>
                        <img src={logo} alt="Logo do IFSolve" className="h-4 cursor-pointer" />
                    </LinkScroll>
                    <div className="flex flex-col gap-6 md:flex-row">
                        {navItems.map((item) => (
                            <MenuItem className="whitespace-nowrap">
                                <LinkScroll
                                    to={item.link}
                                    spy
                                    smooth
                                    offset={-90}
                                    className="flex flex-row gap-2 items-center"
                                >
                                    {item.icon}
                                    {item.text}
                                </LinkScroll>
                            </MenuItem>
                        ))}
                    </div>
                </div>
                <Typography className="text-center text-dark-60 font-normal py-8">
                    &copy; 2023 IFSolve
                </Typography>
            </div>
        </footer>
    );
}
