export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const USERS_URL = '/api/users';
export const ARTICLE_URL = '/api/articles';

export const LANGUAGES = {
    en: { code: 'en', name: 'English' },
    es: { code: 'es', name: 'Español' },
    fr: { code: 'fr', name: 'Français' },
    de: { code: 'de', name: 'Deutsch' },
    pt: { code: 'pt', name: 'Português' },
};

export const TRANSLATIONS = {
    en: {
        siteTitle: 'The International Articles',
        dashboard: 'Dashboard',
        articles: 'Articles',
        myArticles: 'My Articles',
        favoriteArticles: 'Favorite Articles',
        noFavorites: 'No favorite articles yet.',
        menu: 'Menu',
        signIn: 'Sign In',
        logout: 'Logout',
        searchPlaceholder: 'Search...',
        writeArticle: 'Write Article',
        share: 'Share',
        hi: 'Hi',
        featuredArticle: 'Featured Article',
        recentArticles: 'Recent Articles',
        email: 'Email',
        login: 'Login',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign Up',
        account: 'Your Account',
        name: 'Name',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        update: 'Update',
        passwordsMismatch: 'Passwords do not match',
        profileUpdated: 'Profile updated successfully',
        register: 'Register',
        submit: 'Sign Up',
        alreadyHaveAccount: 'Already have an account?',
        readMore: 'Read More',
        all: 'All',
        published: 'Published',
        draft: 'Draft',
        publish: 'Publish',
        unpublish: 'Unpublish',
        saveChanges: 'Save Changes',
        delete: 'Delete',
        selectOtherLanguage: 'Select Other Language',
        title: 'Title',
        date: 'Date',
        content: 'Content',
        none: 'None',
        edit: 'Edit',
    },
    es: {
        siteTitle: 'Los Artículos Internacionales',
        dashboard: 'Tablero',
        articles: 'Artículos',
        myArticles: 'Mis Artículos',
        favoriteArticles: 'Artículos Favoritos',
        noFavorites: 'Aún no tienes artículos favoritos.',
        menu: 'Menú',
        signIn: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        searchPlaceholder: 'Buscar...',
        writeArticle: 'Escribir Artículo',
        share: 'Compartir',
        hi: 'Hola',
        featuredArticle: 'Artículo Destacado',
        recentArticles: 'Artículos Recientes',
        email: 'Correo electrónico',
        login: 'Iniciar sesión',
        dontHaveAccount: '¿No tienes una cuenta?',
        signUp: 'Regístrate',
        account: 'Tu Cuenta',
        name: 'Nombre',
        password: 'Contraseña',
        confirmPassword: 'Confirmar Contraseña',
        update: 'Actualizar',
        passwordsMismatch: 'Las contraseñas no coinciden',
        profileUpdated: 'Perfil actualizado con éxito',
        register: 'Registrarse',
        submit: 'Registrarse',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        readMore: 'Leer más',
        all: 'Todos',
        published: 'Publicado',
        draft: 'Borrador',
        publish: 'Publicar',
        unpublish: 'Despublicar',
        saveChanges: 'Guardar cambios',
        delete: 'Eliminar',
        selectOtherLanguage: 'Seleccionar otro idioma',
        title: 'Título',
        date: 'Fecha',
        content: 'Contenido',
        none: 'Ninguno',
        edit: 'Editar',
    },
    fr: {
        siteTitle: 'Les Articles Internationaux',
        dashboard: 'Tableau de bord',
        articles: 'Articles',
        myArticles: 'Mes Articles',
        favoriteArticles: 'Articles Favoris',
        noFavorites: 'Aucun article favori pour le moment.',
        menu: 'Menu',
        signIn: 'Se connecter',
        logout: 'Se déconnecter',
        searchPlaceholder: 'Rechercher...',
        writeArticle: 'Écrire un Article',
        share: 'Partager',
        hi: 'Salut',
        featuredArticle: 'Article en Vedette',
        recentArticles: 'Articles Récents',
        email: 'Email',
        login: 'Se connecter',
        dontHaveAccount: "Vous n'avez pas de compte?",
        signUp: "S'inscrire",
        account: 'Votre Compte',
        name: 'Nom',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        update: 'Mettre à jour',
        passwordsMismatch: 'Les mots de passe ne correspondent pas',
        profileUpdated: 'Profil mis à jour avec succès',
        register: "S'inscrire",
        submit: "S'inscrire",
        alreadyHaveAccount: 'Vous avez déjà un compte?',
        readMore: 'Lire la suite',
        all: 'Tous',
        published: 'Publié',
        draft: 'Brouillon',
        publish: 'Publier',
        unpublish: 'Dépublier',
        saveChanges: 'Enregistrer les modifications',
        delete: 'Supprimer',
        selectOtherLanguage: 'Sélectionner une autre langue',
        title: 'Titre',
        date: 'Date',
        content: 'Contenu',
        none: 'Aucun',
        edit: 'Modifier',
    },
    de: {
        siteTitle: 'Die Internationalen Artikel',
        dashboard: 'Armaturenbrett',
        articles: 'Artikel',
        myArticles: 'Meine Artikel',
        favoriteArticles: 'Lieblingsartikel',
        noFavorites: 'Noch keine Lieblingsartikel.',
        menu: 'Menü',
        signIn: 'Anmelden',
        logout: 'Abmelden',
        searchPlaceholder: 'Suchen...',
        writeArticle: 'Artikel Schreiben',
        share: 'Teilen',
        hi: 'Hallo',
        featuredArticle: 'Empfohlener Artikel',
        recentArticles: 'Neueste Artikel',
        email: 'E-Mail',
        login: 'Einloggen',
        dontHaveAccount: 'Hast du ein Konto?',
        signUp: 'Registrieren',
        account: 'Ihr Konto',
        name: 'Name',
        password: 'Passwort',
        confirmPassword: 'Passwort bestätigen',
        update: 'Aktualisieren',
        passwordsMismatch: 'Passwörter stimmen nicht überein',
        profileUpdated: 'Profil erfolgreich aktualisiert',
        register: 'Registrieren',
        submit: 'Anmelden',
        alreadyHaveAccount: 'Hast du bereits ein Konto?',
        readMore: 'Weiterlesen',
        all: 'Alle',
        published: 'Veröffentlicht',
        draft: 'Entwurf',
        publish: 'Veröffentlichen',
        unpublish: 'Unveröffentlichen',
        saveChanges: 'Änderungen speichern',
        delete: 'Löschen',
        selectOtherLanguage: 'Andere Sprache auswählen',
        title: 'Titel',
        date: 'Datum',
        content: 'Inhalt',
        none: 'Keiner',
        edit: 'Bearbeiten',
    },
    pt: {
        siteTitle: 'Os Artigos Internacionais',
        dashboard: 'Painel',
        articles: 'Artigos',
        myArticles: 'Meus Artigos',
        favoriteArticles: 'Artigos Favoritos',
        noFavorites: 'Ainda não há artigos favoritos.',
        menu: 'Menu',
        signIn: 'Entrar',
        logout: 'Sair',
        searchPlaceholder: 'Pesquisar...',
        writeArticle: 'Escrever Artigo',
        share: 'Compartilhar',
        hi: 'Oi',
        featuredArticle: 'Artigo em Destaque',
        recentArticles: 'Artigos Recentes',
        email: 'E-mail',
        login: 'Entrar',
        dontHaveAccount: 'Não tem uma conta?',
        signUp: 'Registrar',
        account: 'Sua Conta',
        name: 'Nome',
        password: 'Senha',
        confirmPassword: 'Confirmar Senha',
        update: 'Atualizar',
        passwordsMismatch: 'As senhas não coincidem',
        profileUpdated: 'Perfil atualizado com sucesso',
        register: 'Registrar',
        submit: 'Registrar',
        alreadyHaveAccount: 'Já tem uma conta?',
        readMore: 'Leia mais',
        all: 'Todos',
        published: 'Publicado',
        draft: 'Rascunho',
        publish: 'Publicar',
        unpublish: 'Despublicar',
        saveChanges: 'Salvar alterações',
        delete: 'Excluir',
        selectOtherLanguage: 'Selecionar outro idioma',
        title: 'Título',
        date: 'Data',
        content: 'Conteúdo',
        none: 'Nenhum',
        edit: 'Editar',
    },
};
