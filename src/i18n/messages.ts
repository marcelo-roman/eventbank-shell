import { type Locale } from './locale';

const en = {
  skipToContent: 'Skip to content',
  mainNavigation: 'Main',
  language: 'Language',
  nav: {
    application: 'Your application',
    accounts: 'Accounts',
    pix: 'PIX',
    cards: 'Cards',
    backoffice: 'Back office',
    projections: 'Projections',
  },
  remotes: {
    onboarding: 'Your application',
    accounts: 'Accounts',
    transfers: 'PIX',
    cards: 'Cards',
    backoffice: 'Back office',
    operations: 'Projections',
  },
  session: {
    signIn: 'Sign in',
    signOut: 'Sign out',
    signingIn: 'Signing you in…',
    signingOut: 'Signing you out…',
    signInFailed: 'Sign-in failed.',
    takingToSignIn: 'Taking you to sign in…',
    notAvailable: 'This area is not available for your profile.',
  },
  loading: 'Loading…',
  loadingProfile: 'Loading your profile…',
  loadingRemote: (label: string) => `Loading ${label.toLowerCase()}…`,
  remoteUnavailable: (label: string) =>
    `${label} is unavailable right now. The rest of EventBank keeps working; reload the page to try again.`,
  landing: {
    title: 'Banking built on events.',
    lede: 'Open an account, send PIX, pay with a virtual card. Every balance you see is the sum of the facts recorded about your money, and you can replay any of them.',
    openAccount: 'Open your account',
    stepsTitle: 'How opening an account works',
    steps: [
      'Create your login with an e-mail and a password.',
      'Tell us who you are: full name, CPF, birth date and phone.',
      'Our team reviews your application.',
      'Your checking account opens, ready for PIX and a virtual card.',
    ],
  },
};

export type Messages = typeof en;

const ptBR: Messages = {
  skipToContent: 'Pular para o conteúdo',
  mainNavigation: 'Principal',
  language: 'Idioma',
  nav: {
    application: 'Sua proposta',
    accounts: 'Contas',
    pix: 'PIX',
    cards: 'Cartões',
    backoffice: 'Back office',
    projections: 'Projeções',
  },
  remotes: {
    onboarding: 'Sua proposta',
    accounts: 'Contas',
    transfers: 'PIX',
    cards: 'Cartões',
    backoffice: 'Back office',
    operations: 'Projeções',
  },
  session: {
    signIn: 'Entrar',
    signOut: 'Sair',
    signingIn: 'Entrando…',
    signingOut: 'Saindo…',
    signInFailed: 'Não foi possível entrar.',
    takingToSignIn: 'Levando você para o login…',
    notAvailable: 'Esta área não está disponível para o seu perfil.',
  },
  loading: 'Carregando…',
  loadingProfile: 'Carregando seu perfil…',
  loadingRemote: (label: string) => `Carregando ${label.toLowerCase()}…`,
  remoteUnavailable: (label: string) =>
    `${label} está indisponível no momento. O resto do EventBank continua funcionando; recarregue a página para tentar de novo.`,
  landing: {
    title: 'Um banco feito de eventos.',
    lede: 'Abra uma conta, envie PIX, pague com um cartão virtual. Cada saldo que você vê é a soma dos fatos registrados sobre o seu dinheiro, e você pode reproduzir qualquer um deles.',
    openAccount: 'Abra sua conta',
    stepsTitle: 'Como funciona a abertura de conta',
    steps: [
      'Crie seu login com um e-mail e uma senha.',
      'Conte quem você é: nome completo, CPF, data de nascimento e telefone.',
      'Nosso time analisa sua proposta.',
      'Sua conta corrente é aberta, pronta para PIX e cartão virtual.',
    ],
  },
};

export const messages: Record<Locale, Messages> = { en, 'pt-BR': ptBR };
