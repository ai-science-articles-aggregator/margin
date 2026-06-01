export type Lang = 'en' | 'ru';

export interface Dict {
	// Brand / generic
	brand: string;
	tagline: string;

	// Top-level nav (landing)
	nav: { library: string; how: string; faculties: string; pricing: string; help: string };

	// Auth — common
	auth: {
		signIn: string;
		signUp: string;
		signInLabel: string;
		signInTitle: string;
		signInSub: string;
		signInCta: string;
		registerLabel: string;
		registerTitle: string;
		registerSub: string;
		createCta: string;
		email: string;
		password: string;
		forgot: string;
		noAccount: string;
		createOne: string;
		haveAccount: string;
		login: string;
		firstName: string;
		lastName: string;
		domainVerified: string;
		department: string;
		departmentPlaceholder: string;
		terms: string;
		footerEdition: string;
		heroAuth: [string, string, string];
		heroAuthSub: string;
		heroReg: [string, string, string];
		heroRegSub: string;
		youAsked: string;
		chatPreviewQ: string;
		chatPreviewA1: string;
		chatPreviewA2: string;
		chatPreviewA3: string;
		citeMeta: string;
	};

	// Home / Library
	home: {
		newNotebook: string;
		library: string;
		allNotebooks: string;
		recent: string;
		sharedWithMe: string;
		archived: string;
		settings: string;
		areas: string;
		greeting: string;
		searchHome: string;
		sortRecent: string;
		filterAll: string;
		filterRecent: string;
		filterPublic: string;
		filterAreaPrefix: string;
		filterClear: string;
		emptyTitle: string;
		emptySub: string;
		open: string;
	};

	// Notebook detail
	notebook: {
		autosaved: string;
		share: string;
		add: string;
		newNote: string;
		addNote: string;
		searchSources: string;
		searchSourcesHint: string;
		filterAll: string;
		tabChat: string;
		tabSummary: string;
		tryAsking: string;
		literatureSays: string;
		askCta: string;
		noteType: string;
		generate: string;
		generating: string;
	};

	// Settings
	settings: {
		title: string;
		subtitle: string;
		unsaved: string;
		save: string;
		cancel: string;
		sectAppearance: string;
		sectLanguage: string;
		sectAccount: string;
		sectAreas: string;
		sectNotifs: string;
		sectDanger: string;
		areasHelper: string;
		areasNew: string;
		areasNewPlaceholder: string;
		areasEmpty: string;
		areasDelete: string;
		areasRename: string;
		areasColor: string;
		areasConfirmDelete: (n: string) => string;
		areasDeleted: string;
		areasCreated: string;
		areasUpdated: string;
		areasOperationFailed: string;
		themeLabel: string;
		themeLightDesc: string;
		themeDarkDesc: string;
		themeAutoDesc: string;
		themeLight: string;
		themeDark: string;
		themeAuto: string;
		appearanceSub: string;
		langLabel: string;
		langSub: string;
		region: string;
		timezone: string;
		accountName: string;
		accountEmail: string;
		accountRole: string;
		emailManaged: string;
		verified: string;
		notifDigest: string;
		notifDigestDesc: string;
		notifCites: string;
		notifCitesDesc: string;
		notifShared: string;
		notifSharedDesc: string;
		deleteAccount: string;
		deleteSub: string;
	};

	// Landing
	landing: {
		heroPre: string;
		heroAccent: string;
		heroPost: string;
		heroSub: string;
		pillarsLabel: string;
		pillarsHd: string;
		pillars: { n: string; t: string; d: string }[];
		statsLabel: string;
		stats: { v: string; l: string }[];
		howLabel: string;
		howHd: string;
		how: { n: string; t: string; d: string }[];
		featuredLabel: string;
		featuredHd: string;
		featuredSub: string;
		quoteLabel: string;
		quoteText: string;
		quoteAuthor: string;
		quoteRole: string;
		faqLabel: string;
		faqHd: string;
		faq: { q: string; a: string }[];
		finalLabel: string;
		finalHd: string;
		finalSub: string;
		footerNav: { product: string; company: string; resources: string };
		footerCols: { product: string[]; company: string[]; resources: string[] };
		footerCopy: string;
	};

	// Common
	common: {
		open: string;
		loading: string;
		error: string;
		save: string;
		cancel: string;
		delete: string;
		edit: string;
		yes: string;
		no: string;
		ok: string;
		close: string;
		logout: string;
		settings: string;
		myProfile: string;
	};

	// Create-notebook modal
	createNotebook: {
		sectionMonoref: string;
		title: string;
		subtitle: string;
		titleLabel: string;
		titlePlaceholder: string;
		descLabel: string;
		descHelper: string;
		descPlaceholder: string;
		areaLabel: string;
		areaHelper: string;
		areaNew: string;
		areaNewPlaceholder: string;
		tagsLabel: string;
		tagsHelper: string;
		tagsPlaceholder: string;
		tagsRemove: (tag: string) => string;
		visibilityLabel: string;
		visibilityPrivate: string;
		visibilityPrivateDesc: string;
		visibilityShared: string;
		visibilitySharedDesc: string;
		visibilityPublic: string;
		visibilityPublicDesc: string;
		cancel: string;
		create: string;
		creating: string;
		save: string;
		saving: string;
		editTitle: string;
		editSubtitle: string;
		editSectionMonoref: string;
		statusTags: (n: number) => string;
		statusNoArea: string;
		statusPrivate: string;
		statusShared: string;
		statusPublic: string;
		nameRequired: string;
	};

	// Sharing dialog
	share: {
		title: string;
		subtitle: string;
		emailLabel: string;
		emailPlaceholder: string;
		roleLabel: string;
		roleViewer: string;
		roleCommenter: string;
		roleEditor: string;
		add: string;
		adding: string;
		current: string;
		none: string;
		revoke: string;
		close: string;
		shared: string;
		addFailed: string;
		revokeFailed: string;
		recipientAreaTitle: string;
		recipientAreaHelper: string;
		recipientAreaNone: string;
	};

	// Profile
	profile: {
		title: string;
		subtitle: string;
		firstName: string;
		lastName: string;
		department: string;
		departmentPlaceholder: string;
		email: string;
		save: string;
		cancel: string;
		unsaved: string;
		saved: string;
		saveFailed: string;
		accountInfo: string;
		createdAt: string;
		updatedAt: string;
		personalData: string;
	};

	// Toast messages
	toast: {
		searchFailed: string;
		nothingFound: string;
		summaryReady: string;
		summaryFailed: string;
		exportTodo: string;
		notebookCreated: string;
		notebookCreateFailed: string;
		notebookUpdated: string;
		notebookDeleted: string;
		notebookDeleteFailed: string;
		notebookUpdateFailed: string;
		loadNotebooksFailed: string;
		loginFailed: string;
		registerFailed: string;
		logoutFailed: string;
	};

	// Screen labels
	sl: {
		login: string;
		register: string;
		home: string;
		notebook: string;
		settings: string;
		landing: string;
	};
}

export const dict: Record<Lang, Dict> = {
	en: {
		brand: 'Margin',
		tagline: 'Notebooks for researchers',
		nav: {
			library: 'Library',
			how: 'How it works',
			faculties: 'Faculties',
			pricing: 'Pricing',
			help: 'Help'
		},
		auth: {
			signIn: 'Sign in',
			signUp: 'Sign up',
			signInLabel: 'Sign in',
			signInTitle: 'Welcome back',
			signInSub: 'Continue where you left off — your library is one click away.',
			signInCta: 'Sign in →',
			registerLabel: 'Create account',
			registerTitle: 'Start a library',
			registerSub: 'Available to students, faculty and staff with a verified university email.',
			createCta: 'Create account →',
			email: 'University email',
			password: 'Password',
			forgot: 'Forgot?',
			noAccount: 'No account?',
			createOne: 'Create one →',
			haveAccount: 'Already have an account?',
			login: 'Sign in →',
			firstName: 'First name',
			lastName: 'Last name',
			domainVerified: '✓ DOMAIN VERIFIED — UNIVERSITY.EDU',
			department: 'Department',
			departmentPlaceholder: 'e.g. Computer Science',
			terms: 'By continuing you agree to the Terms and Academic Use Policy.',
			footerEdition: 'v2.4 · INTERNAL · UNIVERSITY EDITION',
			heroAuth: ['Notebooks ', 'for', ' researchers.'],
			heroAuthSub: 'Search your library, ground every claim in a citation, write in the margins.',
			heroReg: ['Every answer, ', 'cited', '.'],
			heroRegSub:
				'Margin grounds the chat in your selected sources. Hover any sentence to see the exact paragraph.',
			youAsked: 'You asked:',
			chatPreviewQ: 'How does shifted window attention reduce cost?',
			chatPreviewA1:
				'Swin partitions the image into windows of M×M patches and computes attention ',
			chatPreviewA2: 'only within each window',
			chatPreviewA3: ', reducing complexity from O(N²) to O(MN).',
			citeMeta: 'LIU ET AL., 2021 · SEC. 3.2'
		},
		home: {
			newNotebook: 'New notebook',
			library: 'Library',
			allNotebooks: 'All notebooks',
			recent: 'Recent',
			sharedWithMe: 'Shared with me',
			archived: 'Archived',
			settings: 'Settings',
			areas: 'Areas',
			greeting: 'Good evening',
			searchHome: 'Search notebooks, sources, notes…',
			sortRecent: 'SORT: RECENT ↓',
			filterAll: 'All',
			filterRecent: 'Recent',
			filterPublic: 'Public',
			filterAreaPrefix: 'Filtered by',
			filterClear: 'Clear',
			emptyTitle: 'No notebooks yet',
			emptySub: 'Create your first notebook with the button above.',
			open: 'OPEN →'
		},
		notebook: {
			autosaved: 'Auto-saved',
			share: 'Share',
			add: '+ Add',
			newNote: '+ New',
			addNote: '+ Add note',
			searchSources:
				'Describe what you\'re looking for — a method, a finding, a paper…',
			searchSourcesHint: '⏎ to search · ⇧⏎ for newline',
			filterAll: 'All',
			tabChat: 'Chat',
			tabSummary: 'Summary',
			tryAsking: 'Try asking',
			literatureSays: 'What the literature says',
			askCta: 'Ask',
			noteType: 'NOTE',
			generate: 'Generate',
			generating: 'Generating…'
		},
		settings: {
			title: 'Settings',
			subtitle: 'Personal preferences for your account.',
			unsaved: 'UNSAVED CHANGES',
			save: 'Save changes',
			cancel: 'Cancel',
			sectAppearance: 'Appearance',
			sectLanguage: 'Language & region',
			sectAccount: 'Account',
			sectAreas: 'Areas',
			sectNotifs: 'Notifications',
			sectDanger: 'Danger zone',
			areasHelper:
				'Personal knowledge areas. Used for sidebar grouping and notebook colour-coding.',
			areasNew: '+ New area',
			areasNewPlaceholder: 'Area name',
			areasEmpty: 'No areas yet. Create one to start organising your notebooks.',
			areasDelete: 'Archive',
			areasRename: 'Rename',
			areasColor: 'Colour',
			areasConfirmDelete: (n) => `Archive area "${n}"? Notebooks tagged with it will keep their content but lose the area.`,
			areasDeleted: 'Area archived',
			areasCreated: 'Area created',
			areasUpdated: 'Area updated',
			areasOperationFailed: 'Operation failed',
			themeLabel: 'Theme',
			themeLightDesc: 'Warm paper background.',
			themeDarkDesc: 'Inked surfaces for night reading.',
			themeAutoDesc: 'Follow system.',
			themeLight: 'Light',
			themeDark: 'Dark',
			themeAuto: 'Auto · system',
			appearanceSub: 'Applies across the entire interface.',
			langLabel: 'Interface language',
			langSub:
				'Affects UI chrome only. Article titles and abstracts stay in their original language.',
			region: 'Region',
			timezone: 'Timezone',
			accountName: 'Display name',
			accountEmail: 'University email',
			accountRole: 'Role',
			emailManaged: 'Managed by university SSO.',
			verified: 'Verified',
			notifDigest: 'Weekly literature digest',
			notifDigestDesc: 'A summary of new papers across your notebooks, every Monday at 09:00.',
			notifCites: 'New citations',
			notifCitesDesc: 'Notify me when a chat answer references one of my saved sources.',
			notifShared: 'Shared notebook activity',
			notifSharedDesc: 'When a co-author edits or comments in a shared notebook.',
			deleteAccount: 'Delete account',
			deleteSub: 'Permanently remove your account and library. This cannot be undone.'
		},
		landing: {
			heroPre: 'Notebooks ',
			heroAccent: 'for',
			heroPost: ' researchers.',
			heroSub:
				'Search 4.2 million papers in the university library. Ground every claim in a citation. Write your conclusions in the margins — and let the bot do the reading.',
			pillarsLabel: '§ Three pillars',
			pillarsHd: 'Less reading, fewer half-remembered citations, more original thought.',
			pillars: [
				{
					n: '01',
					t: 'Search',
					d: "4.2M peer-reviewed articles indexed across the university's subscriptions. Search by author, abstract, citation graph, or full-text — without leaving the library."
				},
				{
					n: '02',
					t: 'Ground',
					d: 'Every chat answer points to a paragraph in a paper you selected. Hover any sentence to see the exact source. Nothing is invented.'
				},
				{
					n: '03',
					t: 'Write',
					d: 'Margin keeps your notes attached to the paragraph that prompted them. Searchable across every notebook, every paper, every chat you ever had.'
				}
			],
			statsLabel: '§ By the numbers',
			stats: [
				{ v: '4.2M', l: 'papers indexed' },
				{ v: '12', l: 'faculties' },
				{ v: '94%', l: 'answers cited' },
				{ v: '8s', l: 'avg. summary' }
			],
			howLabel: '§ How it works',
			howHd: 'From a question to a defensible answer in four steps.',
			how: [
				{
					n: '01',
					t: 'Open a notebook',
					d: 'Choose a topic. Or start blank — the search modal indexes everything you have rights to.'
				},
				{
					n: '02',
					t: 'Select sources',
					d: 'Tick the papers that matter. Margin loads abstracts, full text, figures and citation maps.'
				},
				{
					n: '03',
					t: 'Ask & summarise',
					d: 'Get an auto-summary of the literature; ask follow-up questions in plain language. Citations are inline.'
				},
				{
					n: '04',
					t: 'Write in the margins',
					d: 'Capture your conclusions next to the paragraph that triggered them. Search across notebooks later.'
				}
			],
			featuredLabel: '§ Public notebooks',
			featuredHd: 'A peek into what colleagues are reading.',
			featuredSub:
				'Public notebooks let researchers share their reading lists with summaries and chat history. Below are five recently published collections.',
			quoteLabel: '§ Testimony',
			quoteText:
				'For the first time, I have all my reading in one place — and a tool that can be trusted to cite, not invent. Margin replaced four browser windows and a spreadsheet of PDFs.',
			quoteAuthor: 'Dr. Lena Hofmann',
			quoteRole: 'Senior Lecturer, Computational Biology',
			faqLabel: '§ Common questions',
			faqHd: 'You ask. We answer with sources.',
			faq: [
				{
					q: 'Where does the library come from?',
					a: "Margin uses your university's existing subscription contracts. The search index is rebuilt nightly from publisher feeds; access is governed by the same SSO that runs the library catalogue."
				},
				{
					q: 'Does the chat ever invent citations?',
					a: 'No. Margin is constrained to your selected sources. If the answer is not in them, Margin will say so. Every sentence linked to a source is hoverable; clicking opens the exact paragraph.'
				},
				{
					q: 'Who can see my notebooks?',
					a: 'Only you, by default. Shared notebooks are explicit and revocable; visibility is per-collaborator, not per-link.'
				},
				{
					q: 'Can I export my notes?',
					a: 'Yes — as Markdown with citations, BibTeX, or a flat PDF with your margins inline. Your notes are yours.'
				},
				{
					q: 'Is there a mobile app?',
					a: 'Reading and chat work on the web on mobile. A native iPad app for annotation is in private beta — sign in to join the waitlist.'
				}
			],
			finalLabel: '§ Get started',
			finalHd: 'Open a library card.',
			finalSub: 'Two minutes to sign up; your library is ready the moment you log in.',
			footerNav: { product: 'Product', company: 'Library', resources: 'Resources' },
			footerCols: {
				product: ['Features', 'Chat', 'Search', 'Notes'],
				company: ['About', 'Team', 'Careers', 'Contact'],
				resources: ['Documentation', 'API', 'Status', 'Privacy']
			},
			footerCopy: '© 2026 Margin Project · University Edition · Quiet, citation-first, on paper.'
		},
		common: {
			open: 'OPEN →',
			loading: 'Loading…',
			error: 'Error',
			save: 'Save',
			cancel: 'Cancel',
			delete: 'Delete',
			edit: 'Edit',
			yes: 'Yes',
			no: 'No',
			ok: 'OK',
			close: 'Close',
			logout: 'Sign out',
			settings: 'Settings',
			myProfile: 'My profile'
		},
		createNotebook: {
			sectionMonoref: '§ NEW NOTEBOOK',
			title: 'Open a new notebook',
			subtitle:
				'Give it a title, a one-line scope, and a discipline. You can always change these later — what matters now is starting.',
			titleLabel: 'Title',
			titlePlaceholder: 'e.g. Attention mechanisms in vision transformers',
			descLabel: 'Short description',
			descHelper: '1–2 sentences. What is this notebook for? What question are you trying to answer?',
			descPlaceholder:
				'Comparing global vs. windowed attention — focus on memory/accuracy trade-offs for 4K imagery.',
			areaLabel: 'Area',
			areaHelper:
				'Pick one. Used for the sidebar dot, search filters and recommended sources.',
			areaNew: '+ New area',
			areaNewPlaceholder: 'Type an area name, press Enter',
			tagsLabel: 'Additional tags',
			tagsHelper: 'Optional. Press Enter to add. Tags are private to your library.',
			tagsPlaceholder: 'Add a tag…',
			tagsRemove: (t) => `Remove ${t}`,
			visibilityLabel: 'Visibility',
			visibilityPrivate: 'Private',
			visibilityPrivateDesc: 'Only you can see this notebook.',
			visibilityShared: 'Shared',
			visibilitySharedDesc: 'Co-authors you invite by email.',
			visibilityPublic: 'Public',
			visibilityPublicDesc: 'Anyone with the link can read the summary.',
			cancel: 'Cancel',
			create: 'Create notebook',
			creating: 'Creating…',
			save: 'Save changes',
			saving: 'Saving…',
			editTitle: 'Edit notebook',
			editSubtitle:
				'Update the title, scope, discipline or visibility — everything else stays put.',
			editSectionMonoref: '§ EDIT NOTEBOOK',
			statusTags: (n) => `${n} TAG${n === 1 ? '' : 'S'}`,
			statusNoArea: 'NO AREA',
			statusPrivate: 'PRIVATE',
			statusShared: 'SHARED',
			statusPublic: 'PUBLIC',
			nameRequired: 'Title is required'
		},
		share: {
			title: 'Share notebook',
			subtitle: 'Invite collaborators by email. They will be able to access this notebook with the selected role.',
			emailLabel: 'Email',
			emailPlaceholder: 'colleague@university.edu',
			roleLabel: 'Role',
			roleViewer: 'Viewer',
			roleCommenter: 'Commenter',
			roleEditor: 'Editor',
			add: 'Share',
			adding: 'Sharing…',
			current: 'Current collaborators',
			none: 'No collaborators yet.',
			revoke: 'Revoke',
			close: 'Close',
			shared: 'Invited',
			addFailed: 'Could not share',
			revokeFailed: 'Could not revoke',
			recipientAreaTitle: 'My area',
			recipientAreaHelper: 'Optionally pin this shared notebook under one of your personal areas.',
			recipientAreaNone: 'No area'
		},
		profile: {
			title: 'Profile',
			subtitle: 'Your personal account details.',
			firstName: 'First name',
			lastName: 'Last name',
			department: 'Department',
			departmentPlaceholder: 'e.g. Computer Science',
			email: 'Email',
			save: 'Save changes',
			cancel: 'Cancel',
			unsaved: 'UNSAVED CHANGES',
			saved: 'Profile saved',
			saveFailed: 'Could not save profile',
			accountInfo: 'Account info',
			createdAt: 'Joined',
			updatedAt: 'Last updated',
			personalData: 'Personal data'
		},
		toast: {
			searchFailed: 'Search failed',
			nothingFound: 'No results',
			summaryReady: 'Summary ready',
			summaryFailed: 'Summary failed',
			exportTodo: 'PDF export not implemented yet',
			notebookCreated: 'Notebook created',
			notebookCreateFailed: 'Failed to create notebook',
			notebookUpdated: 'Notebook updated',
			notebookDeleted: 'Notebook deleted',
			notebookDeleteFailed: 'Failed to delete notebook',
			notebookUpdateFailed: 'Failed to update notebook',
			loadNotebooksFailed: 'Failed to load notebooks',
			loginFailed: 'Sign in failed. Check your email and password.',
			registerFailed: 'Registration failed',
			logoutFailed: 'Sign out failed'
		},
		sl: {
			login: '01 · Sign in',
			register: '02 · Register',
			home: '03 · Library',
			notebook: '04 · Notebook',
			settings: '05 · Settings',
			landing: '00 · Landing'
		}
	},

	ru: {
		brand: 'Margin',
		tagline: 'Тетради для исследователей',
		nav: {
			library: 'Библиотека',
			how: 'Как это работает',
			faculties: 'Факультеты',
			pricing: 'Тарифы',
			help: 'Помощь'
		},
		auth: {
			signIn: 'Войти',
			signUp: 'Регистрация',
			signInLabel: 'Войти',
			signInTitle: 'С возвращением',
			signInSub: 'Продолжите с того места, где остановились — библиотека в один клик.',
			signInCta: 'Войти →',
			registerLabel: 'Регистрация',
			registerTitle: 'Откройте библиотеку',
			registerSub:
				'Доступно студентам, преподавателям и сотрудникам с подтверждённым университетским email.',
			createCta: 'Создать аккаунт →',
			email: 'Университетский email',
			password: 'Пароль',
			forgot: 'Забыли?',
			noAccount: 'Нет аккаунта?',
			createOne: 'Создать →',
			haveAccount: 'Уже есть аккаунт?',
			login: 'Войти →',
			firstName: 'Имя',
			lastName: 'Фамилия',
			domainVerified: '✓ ДОМЕН ПОДТВЕРЖДЁН — UNIVERSITY.EDU',
			department: 'Кафедра',
			departmentPlaceholder: 'напр. Computer Science',
			terms: 'Продолжая, вы соглашаетесь с Условиями и Политикой академического использования.',
			footerEdition: 'v2.4 · ВНУТРЕННЯЯ · УНИВЕРСИТЕТСКАЯ ВЕРСИЯ',
			heroAuth: ['Тетради ', 'для', ' исследователей.'],
			heroAuthSub: 'Ищите в библиотеке, обосновывайте каждое утверждение цитатой, пишите на полях.',
			heroReg: ['Каждый ответ — ', 'со ссылкой', '.'],
			heroRegSub:
				'Margin строит ответы только на выбранных источниках. Наведите курсор на предложение, чтобы увидеть точный параграф.',
			youAsked: 'Вы спросили:',
			chatPreviewQ: 'Как сдвинутые окна attention в Swin сокращают вычисления?',
			chatPreviewA1: 'Swin делит изображение на окна M×M патчей и вычисляет attention ',
			chatPreviewA2: 'только в пределах окна',
			chatPreviewA3: ', сокращая сложность с O(N²) до O(MN).',
			citeMeta: 'LIU ET AL., 2021 · СЕК. 3.2'
		},
		home: {
			newNotebook: 'Новая тетрадь',
			library: 'Библиотека',
			allNotebooks: 'Все тетради',
			recent: 'Недавние',
			sharedWithMe: 'Доступные мне',
			archived: 'Архив',
			settings: 'Настройки',
			areas: 'Области',
			greeting: 'Добрый вечер',
			searchHome: 'Поиск тетрадей, источников, заметок…',
			sortRecent: 'СОРТИРОВКА: НЕДАВНИЕ ↓',
			filterAll: 'Все',
			filterRecent: 'Недавние',
			filterPublic: 'Публичные',
			filterAreaPrefix: 'Фильтр',
			filterClear: 'Сбросить',
			emptyTitle: 'У вас пока нет тетрадей',
			emptySub: 'Создайте первую тетрадь кнопкой выше.',
			open: 'ОТКРЫТЬ →'
		},
		notebook: {
			autosaved: 'Сохранено',
			share: 'Поделиться',
			add: '+ Добавить',
			newNote: '+ Новая',
			addNote: '+ Добавить заметку',
			searchSources:
				'Опишите что ищете — метод, результат, нужную статью…',
			searchSourcesHint: '⏎ — поиск · ⇧⏎ — перенос строки',
			filterAll: 'Все',
			tabChat: 'Чат',
			tabSummary: 'Саммари',
			tryAsking: 'Попробуйте спросить',
			literatureSays: 'Что говорит литература',
			askCta: 'Спросить',
			noteType: 'ЗАМЕТКА',
			generate: 'Сгенерировать',
			generating: 'Генерация…'
		},
		settings: {
			title: 'Настройки',
			subtitle: 'Личные настройки вашего аккаунта.',
			unsaved: 'ЕСТЬ НЕСОХРАНЁННЫЕ ИЗМЕНЕНИЯ',
			save: 'Сохранить',
			cancel: 'Отмена',
			sectAppearance: 'Оформление',
			sectLanguage: 'Язык и регион',
			sectAccount: 'Аккаунт',
			sectAreas: 'Области',
			sectNotifs: 'Уведомления',
			sectDanger: 'Опасная зона',
			areasHelper:
				'Личные области знаний. Используются для группировки в сайдбаре и цвета тетрадей.',
			areasNew: '+ Новая область',
			areasNewPlaceholder: 'Название области',
			areasEmpty: 'Областей пока нет. Создайте первую, чтобы начать организацию тетрадей.',
			areasDelete: 'Архивировать',
			areasRename: 'Переименовать',
			areasColor: 'Цвет',
			areasConfirmDelete: (n) => `Архивировать область «${n}»? Тетради сохранят содержимое, но потеряют привязку к области.`,
			areasDeleted: 'Область архивирована',
			areasCreated: 'Область создана',
			areasUpdated: 'Область обновлена',
			areasOperationFailed: 'Операция не выполнена',
			themeLabel: 'Тема',
			themeLightDesc: 'Тёплый бумажный фон.',
			themeDarkDesc: 'Тёмные поверхности для ночного чтения.',
			themeAutoDesc: 'По системным настройкам.',
			themeLight: 'Светлая',
			themeDark: 'Тёмная',
			themeAuto: 'Авто · система',
			appearanceSub: 'Применяется ко всему интерфейсу.',
			langLabel: 'Язык интерфейса',
			langSub:
				'Затрагивает только интерфейс. Названия статей и аннотации остаются на исходном языке.',
			region: 'Регион',
			timezone: 'Часовой пояс',
			accountName: 'Отображаемое имя',
			accountEmail: 'Университетский email',
			accountRole: 'Роль',
			emailManaged: 'Управляется университетским SSO.',
			verified: 'Подтверждён',
			notifDigest: 'Еженедельная подборка литературы',
			notifDigestDesc: 'Сводка новых статей по вашим тетрадям, каждый понедельник в 09:00.',
			notifCites: 'Новые цитирования',
			notifCitesDesc:
				'Уведомлять, когда ответ чата ссылается на один из ваших сохранённых источников.',
			notifShared: 'Активность в общих тетрадях',
			notifSharedDesc: 'Когда соавтор редактирует или комментирует общую тетрадь.',
			deleteAccount: 'Удалить аккаунт',
			deleteSub: 'Безвозвратно удалить аккаунт и библиотеку. Это нельзя отменить.'
		},
		landing: {
			heroPre: 'Тетради ',
			heroAccent: 'для',
			heroPost: ' исследователей.',
			heroSub:
				'Ищите среди 4,2 млн статей в университетской библиотеке. Обосновывайте каждое утверждение цитатой. Пишите свои выводы на полях — а чтение оставьте боту.',
			pillarsLabel: '§ Три опоры',
			pillarsHd: 'Меньше чтения, меньше полузабытых ссылок, больше собственных мыслей.',
			pillars: [
				{
					n: '01',
					t: 'Поиск',
					d: '4,2 млн рецензируемых статей по университетским подпискам. Поиск по автору, аннотации, графу цитирований или полному тексту — не выходя из библиотеки.'
				},
				{
					n: '02',
					t: 'Опора',
					d: 'Каждый ответ чата указывает на параграф в выбранной вами статье. Наведите курсор — увидите точный источник. Ничего не выдумано.'
				},
				{
					n: '03',
					t: 'Запись',
					d: 'Margin привязывает заметки к параграфу, который их вызвал. Поиск работает по всем тетрадям, статьям и чатам, которые у вас когда-либо были.'
				}
			],
			statsLabel: '§ В цифрах',
			stats: [
				{ v: '4,2M', l: 'статей в индексе' },
				{ v: '12', l: 'факультетов' },
				{ v: '94%', l: 'ответов с цитатой' },
				{ v: '8с', l: 'среднее саммари' }
			],
			howLabel: '§ Как это работает',
			howHd: 'От вопроса до обоснованного ответа за четыре шага.',
			how: [
				{
					n: '01',
					t: 'Откройте тетрадь',
					d: 'Выберите тему — или начните с чистого листа. Модал поиска индексирует всё, к чему у вас есть доступ.'
				},
				{
					n: '02',
					t: 'Выберите источники',
					d: 'Отметьте важные статьи. Margin загружает аннотации, полный текст, рисунки и карту цитирований.'
				},
				{
					n: '03',
					t: 'Спросите и обобщите',
					d: 'Получите авто-саммари литературы; задавайте уточняющие вопросы простым языком. Цитаты — прямо в тексте.'
				},
				{
					n: '04',
					t: 'Пишите на полях',
					d: 'Фиксируйте выводы рядом с параграфом, который их вызвал. Потом ищите по всем тетрадям.'
				}
			],
			featuredLabel: '§ Публичные тетради',
			featuredHd: 'Загляните в то, что читают коллеги.',
			featuredSub:
				'Публичные тетради позволяют делиться списками литературы с саммари и историей чата. Ниже — пять недавно опубликованных подборок.',
			quoteLabel: '§ Отзыв',
			quoteText:
				'Впервые всё моё чтение в одном месте — и инструмент, которому можно доверить цитирование, а не выдумки. Margin заменил мне четыре окна браузера и таблицу с PDF.',
			quoteAuthor: 'Д-р Лена Хофман',
			quoteRole: 'Старший преподаватель, Вычислительная биология',
			faqLabel: '§ Частые вопросы',
			faqHd: 'Вы спрашиваете. Мы отвечаем со ссылками.',
			faq: [
				{
					q: 'Откуда берётся библиотека?',
					a: 'Margin использует уже существующие подписочные контракты университета. Поисковый индекс перестраивается каждую ночь из лент издателей; доступ — через тот же SSO, что и каталог библиотеки.'
				},
				{
					q: 'Чат когда-нибудь выдумывает цитаты?',
					a: 'Нет. Margin ограничен выбранными вами источниками. Если ответа в них нет, Margin так и скажет. Каждое предложение со ссылкой подсвечивается при наведении; клик открывает точный параграф.'
				},
				{
					q: 'Кто видит мои тетради?',
					a: 'По умолчанию — только вы. Совместный доступ всегда явный и отзываемый; видимость — пер-соавтор, не пер-ссылка.'
				},
				{
					q: 'Можно ли экспортировать заметки?',
					a: 'Да — в Markdown с цитатами, BibTeX или плоский PDF с заметками на полях. Ваши заметки принадлежат вам.'
				},
				{
					q: 'Есть ли мобильное приложение?',
					a: 'Чтение и чат работают в браузере на мобильном. Нативное приложение для iPad — в закрытой бете. Войдите, чтобы попасть в лист ожидания.'
				}
			],
			finalLabel: '§ Начать',
			finalHd: 'Откройте библиотечную карту.',
			finalSub: 'Две минуты на регистрацию; библиотека готова, как только вы войдёте.',
			footerNav: { product: 'Продукт', company: 'Библиотека', resources: 'Ресурсы' },
			footerCols: {
				product: ['Возможности', 'Чат', 'Поиск', 'Заметки'],
				company: ['О проекте', 'Команда', 'Карьера', 'Контакты'],
				resources: ['Документация', 'API', 'Статус', 'Конфиденциальность']
			},
			footerCopy: '© 2026 Margin Project · Университетская версия · Тихо, со ссылками, на бумаге.'
		},
		common: {
			open: 'ОТКРЫТЬ →',
			loading: 'Загрузка…',
			error: 'Ошибка',
			save: 'Сохранить',
			cancel: 'Отмена',
			delete: 'Удалить',
			edit: 'Редактировать',
			yes: 'Да',
			no: 'Нет',
			ok: 'ОК',
			close: 'Закрыть',
			logout: 'Выйти',
			settings: 'Настройки',
			myProfile: 'Мой профиль'
		},
		createNotebook: {
			sectionMonoref: '§ НОВАЯ ТЕТРАДЬ',
			title: 'Открыть новую тетрадь',
			subtitle:
				'Дайте название, одностраничный фокус и область. Всё это можно поменять потом — сейчас важно начать.',
			titleLabel: 'Название',
			titlePlaceholder: 'напр. Механизмы внимания в vision-трансформерах',
			descLabel: 'Краткое описание',
			descHelper:
				'1–2 предложения. Зачем эта тетрадь? На какой вопрос вы пытаетесь ответить?',
			descPlaceholder:
				'Сравнение глобального и оконного внимания — фокус на компромиссах память/точность для 4K.',
			areaLabel: 'Область',
			areaHelper:
				'Выберите одну. Используется для точки в сайдбаре, фильтров поиска и подбора источников.',
			areaNew: '+ Новая область',
			areaNewPlaceholder: 'Введите название области, Enter',
			tagsLabel: 'Доп. теги',
			tagsHelper: 'По желанию. Enter — добавить. Теги видны только вам.',
			tagsPlaceholder: 'Добавить тег…',
			tagsRemove: (t) => `Удалить ${t}`,
			visibilityLabel: 'Видимость',
			visibilityPrivate: 'Личная',
			visibilityPrivateDesc: 'Тетрадь видите только вы.',
			visibilityShared: 'Расшаренная',
			visibilitySharedDesc: 'Соавторы по приглашению email.',
			visibilityPublic: 'Публичная',
			visibilityPublicDesc: 'Любой со ссылкой может прочитать саммари.',
			cancel: 'Отмена',
			create: 'Создать тетрадь',
			creating: 'Создание…',
			save: 'Сохранить',
			saving: 'Сохранение…',
			editTitle: 'Изменить тетрадь',
			editSubtitle:
				'Обновите название, фокус, область или видимость — остальное останется как было.',
			editSectionMonoref: '§ РЕДАКТИРОВАНИЕ',
			statusTags: (n) => {
				const last = n % 10;
				const mod = n % 100;
				if (mod >= 11 && mod <= 14) return `${n} ТЕГОВ`;
				if (last === 1) return `${n} ТЕГ`;
				if (last >= 2 && last <= 4) return `${n} ТЕГА`;
				return `${n} ТЕГОВ`;
			},
			statusNoArea: 'БЕЗ ОБЛАСТИ',
			statusPrivate: 'ЛИЧНАЯ',
			statusShared: 'РАСШАРЕННАЯ',
			statusPublic: 'ПУБЛИЧНАЯ',
			nameRequired: 'Название обязательно'
		},
		share: {
			title: 'Поделиться тетрадью',
			subtitle: 'Пригласите соавторов по email. Они получат доступ к тетради с выбранной ролью.',
			emailLabel: 'Email',
			emailPlaceholder: 'collega@university.edu',
			roleLabel: 'Роль',
			roleViewer: 'Зритель',
			roleCommenter: 'Комментатор',
			roleEditor: 'Редактор',
			add: 'Поделиться',
			adding: 'Отправка…',
			current: 'Текущие соавторы',
			none: 'Пока никого.',
			revoke: 'Отозвать',
			close: 'Закрыть',
			shared: 'Приглашён',
			addFailed: 'Не удалось пригласить',
			revokeFailed: 'Не удалось отозвать',
			recipientAreaTitle: 'Моя область',
			recipientAreaHelper: 'По желанию — прикрепить эту расшаренную тетрадь к одной из ваших личных областей.',
			recipientAreaNone: 'Без области'
		},
		profile: {
			title: 'Профиль',
			subtitle: 'Личные данные аккаунта.',
			firstName: 'Имя',
			lastName: 'Фамилия',
			department: 'Кафедра',
			departmentPlaceholder: 'напр. Computer Science',
			email: 'Email',
			save: 'Сохранить изменения',
			cancel: 'Отмена',
			unsaved: 'ЕСТЬ НЕСОХРАНЁННЫЕ ИЗМЕНЕНИЯ',
			saved: 'Профиль сохранён',
			saveFailed: 'Не удалось сохранить профиль',
			accountInfo: 'Информация об аккаунте',
			createdAt: 'Регистрация',
			updatedAt: 'Последнее обновление',
			personalData: 'Личные данные'
		},
		toast: {
			searchFailed: 'Не удалось выполнить поиск',
			nothingFound: 'По запросу ничего не найдено',
			summaryReady: 'Саммари готово',
			summaryFailed: 'Ошибка генерации саммари',
			exportTodo: 'Экспорт в PDF пока не реализован',
			notebookCreated: 'Тетрадь создана',
			notebookCreateFailed: 'Не удалось создать тетрадь',
			notebookUpdated: 'Тетрадь обновлена',
			notebookDeleted: 'Тетрадь удалена',
			notebookDeleteFailed: 'Не удалось удалить тетрадь',
			notebookUpdateFailed: 'Не удалось обновить тетрадь',
			loadNotebooksFailed: 'Не удалось загрузить тетради',
			loginFailed: 'Не удалось войти. Проверьте email и пароль.',
			registerFailed: 'Не удалось зарегистрироваться',
			logoutFailed: 'Не удалось выйти'
		},
		sl: {
			login: '01 · Авторизация',
			register: '02 · Регистрация',
			home: '03 · Библиотека',
			notebook: '04 · Тетрадь',
			settings: '05 · Настройки',
			landing: '00 · Лендинг'
		}
	}
};
