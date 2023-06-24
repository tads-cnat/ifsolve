import { Link } from 'react-router-dom';
import { FiClock, FiDatabase, FiHelpCircle, FiZap } from 'react-icons/fi';
import { Navbar, Typography, Button, MenuItem } from '@material-tailwind/react';
import logo from '../../images/IFSolve-logo.svg';
import featrueOne from '../../images/featureOne.jpg';
import ctaImg from '../../images/cta.jpg';
import poster from '../../images/poster.png';
import promoVideo from '../../videos/promo_video.mp4';

export default function Landing() {
    return (
        <div className="flex flex-col  min-h-screen text-dark-100">
            <MyNavbar />
            <Hero />
            <Feature />
            <CTA />
            <FAQ />
            <Footer />
        </div>
    );
}

function MyNavbar() {
    return (
        <Navbar className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto sticky flex flex-row items-center justify-between text-dark-100 top-2 z-10 h-max max-w-full rounded-lg py-2 px-4 lg:px-8">
            <a href="#hero">
                <img src={logo} alt="Logo do IFSolve" className="h-4" />
            </a>
            <div className="flex flex-row gap-6">
                <MenuItem>
                    <a href="#features" className="flex flex-row gap-2 items-center">
                        <FiZap />
                        Funcionalidades
                    </a>
                </MenuItem>
                <MenuItem className="whitespace-nowrap">
                    <a href="#faq" className="flex flex-row gap-2 items-center">
                        <FiHelpCircle /> Perguntas frequentes
                    </a>
                </MenuItem>
            </div>
            <Link to="/login">
                <Button color="teal">Entrar</Button>
            </Link>
        </Navbar>
    );
}

function Hero() {
    return (
        <div
            id="hero"
            className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto flex flex-col items-center justify-center min-h-screen mt-32 mb-24"
        >
            <Typography variant="h1" className="text-center text-teal-700 mb-2 w-full md:w-4/5">
                Simplifique o processo de criação e aplicação de provas
            </Typography>
            <Typography
                variant="paragraph"
                className="text-center text-dark-80 mb-8 w-full md:w-4/5"
            >
                Destaque-se como professor inovador, facilite o gerenciamento das suas atividades
                avaliativas e eleve o desempenho dos seus alunos. Com o IFSolve, você tem em suas
                mãos uma ferramenta poderosa e intuitiva, desenvolvida especialmente para atender às
                suas necessidades acadêmicas
            </Typography>
            <div className="flex flex-row gap-4 mb-16">
                <Button variant="outlined" color="blue-gray">
                    Ler Mais
                </Button>
                <Link to="/login">
                    <Button color="teal">Entrar</Button>
                </Link>
            </div>
            <div className="rounded-lg border border-[12px] border-white shadow-lg">
                <video className="h-full w-full " poster={poster} controls>
                    <source src={promoVideo} type="video/mp4" />
                    Seu navegador não suporta vídeos
                </video>
            </div>
        </div>
    );
}

function Feature() {
    const features = [
        {
            icon: <FiClock />,
            header: 'Criação e personalização de atividades em minutos',
            body: 'Crie e personalize suas atividades avaliativas em poucos minutos. Escolha entre questões de múltipla escolha e respostas dissertativas. Com apenas alguns cliques, você estará pronto para envolver e desafiar seus alunos',
        },
        {
            icon: <FiDatabase />,
            header: 'Banco de questões completo e diversificado',
            body: 'Com acesso a um banco de questões diversificado. O IFSolve oferece uma ampla variedade de questões previamente cadastradas e categorizadas, permitindo que você encontre facilmente o conteúdo que precisa',
        },
        // {
        //     icon: featrueOne,
        //     header: 'Gerenciamento eficiente de turmas e alunos',
        //     body: 'Organize suas turmas de maneira eficiente e tenha uma visão completa do desempenho dos seus alunos. Através do IFSolve, você pode cadastrar suas turmas, adicionar alunos e acompanhar seu progresso individual e coletivo. Identifique rapidamente áreas de melhoria e personalize o aprendizado para cada aluno.',
        // },
    ];

    return (
        <div id="features" className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto mb-24">
            <Typography variant="h3" className="mb-2 text-teal-700">
                Aproveite ao máximo sua experiência com o IFSolve
            </Typography>
            <Typography variant="paragraph" className="mb-8 text-blue-gray-800">
                Transforme a forma como você avalia e engaja seus alunos. Estamos aqui para apoiá-lo
                em sua jornada educacional
            </Typography>
            <img
                src={featrueOne}
                alt="Funcionalidades do sistema"
                className="aspect-[31/9] mb-8 object-cover object-bottom"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                {features.map((item) => (
                    <div className="flex flex-col items-start">
                        <div className="text-xl text-teal-600 bg-dark-10 p-2 rounded-lg mb-4">
                            {item.icon}
                        </div>
                        <Typography variant="h6" className="text-dark-100 mb-4">
                            {item.header}
                        </Typography>
                        <Typography variant="small" className="text-dark-80">
                            {item.body}
                        </Typography>
                    </div>
                ))}
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
                <Typography className="text-center w-full md:w-4/5 mb-12 text-dark-20">
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
    return (
        <footer className="w-full border-t border-dark-10">
            <div className="w-11/12 md:w-10/12 xl:w-4/6 mx-auto">
                <div className="flex flex-row justify-between items-center  py-8">
                    <img src={logo} alt="Logo do IFSolve" className="h-4" />
                    <div className="flex flex-row gap-6">
                        <MenuItem>
                            <a href="#features" className="flex flex-row gap-2 items-center">
                                <FiZap />
                                Funcionalidades
                            </a>
                        </MenuItem>
                        <MenuItem className="whitespace-nowrap">
                            <a href="#faq" className="flex flex-row gap-2 items-center">
                                <FiHelpCircle /> Perguntas frequentes
                            </a>
                        </MenuItem>
                    </div>
                </div>
                <Typography className="text-center text-dark-60 font-normal py-8">
                    &copy; 2023 IFSolve
                </Typography>
            </div>
        </footer>
    );
}
