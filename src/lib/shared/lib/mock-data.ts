import type { AreaId } from './tokens';

export interface MockNotebook {
	id: string;
	title: string;
	titleRu: string;
	areaId: AreaId;
	sources: number;
	notes: number;
	updated: string;
	updatedRu: string;
	excerpt: string;
	excerptRu: string;
}

export interface MockSource {
	id: string;
	title: string;
	authors: string;
	venue: string;
	year: number;
	cited: number | null;
	selected: boolean;
	type: 'paper' | 'note';
}

interface MockChatCite {
	id: string;
	label: string;
	frag: string;
}

export interface MockChatMessage {
	role: 'user' | 'assistant';
	text: string;
	textRu?: string;
	cites?: MockChatCite[];
}

export interface MockSummary {
	bullets: string[];
	bulletsRu: string[];
	questions: string[];
	questionsRu: string[];
}

export interface MockNote {
	title: string;
	titleRu: string;
	body: string;
	bodyRu: string;
	date: string;
	dateRu: string;
}

export const MOCK_NOTEBOOKS: MockNotebook[] = [
	{
		id: 'nb-1',
		title: 'Attention mechanisms in vision transformers',
		titleRu: 'Механизмы внимания в vision-трансформерах',
		areaId: 'ml',
		sources: 24,
		notes: 12,
		updated: '2 hours ago',
		updatedRu: '2 часа назад',
		excerpt:
			'Comparing global vs. windowed attention across ViT, Swin, MaxViT — focus on memory/accuracy trade-offs for 4K imagery.',
		excerptRu:
			'Сравнение глобального и оконного внимания в ViT, Swin, MaxViT — фокус на компромиссах память/точность для 4K-изображений.'
	},
	{
		id: 'nb-2',
		title: 'CRISPR-Cas9 off-target effects in primary cells',
		titleRu: 'Off-target эффекты CRISPR-Cas9 в первичных клетках',
		areaId: 'bio',
		sources: 41,
		notes: 23,
		updated: 'yesterday',
		updatedRu: 'вчера',
		excerpt:
			'Cross-tissue comparison of guide RNA specificity, GUIDE-seq vs CIRCLE-seq, with focus on hematopoietic stem cells.',
		excerptRu:
			'Сравнение специфичности направляющих РНК в разных тканях, GUIDE-seq vs CIRCLE-seq, фокус на кроветворных стволовых клетках.'
	},
	{
		id: 'nb-3',
		title: 'Topological insulators at room temperature',
		titleRu: 'Топологические изоляторы при комнатной температуре',
		areaId: 'phys',
		sources: 18,
		notes: 7,
		updated: '3 days ago',
		updatedRu: '3 дня назад',
		excerpt:
			'Recent ARPES measurements on Bi₂Se₃ / Sb₂Te₃ heterostructures; spin-orbit coupling and surface state robustness.',
		excerptRu:
			'Свежие ARPES-измерения гетероструктур Bi₂Se₃ / Sb₂Te₃; спин-орбитальное взаимодействие и устойчивость поверхностных состояний.'
	},
	{
		id: 'nb-4',
		title: 'Working memory & prefrontal cortex models',
		titleRu: 'Рабочая память и модели префронтальной коры',
		areaId: 'neuro',
		sources: 31,
		notes: 19,
		updated: 'last week',
		updatedRu: 'на прошлой неделе',
		excerpt:
			'Persistent activity vs. activity-silent theories; integrating fMRI, ECoG, single-unit data.',
		excerptRu:
			'Persistent activity против activity-silent теорий; интеграция fMRI, ECoG, single-unit данных.'
	},
	{
		id: 'nb-5',
		title: 'Perovskite solar cells — stability review',
		titleRu: 'Перовскитные солнечные элементы — обзор стабильности',
		areaId: 'mat',
		sources: 56,
		notes: 8,
		updated: 'last week',
		updatedRu: 'на прошлой неделе',
		excerpt:
			'Degradation pathways under thermal/UV stress; mixed-cation strategies; 1000-hour benchmarks.',
		excerptRu:
			'Пути деградации при термическом/УФ-стрессе; стратегии смешанных катионов; 1000-часовые бенчмарки.'
	},
	{
		id: 'nb-6',
		title: 'Diffusion models for molecular generation',
		titleRu: 'Диффузионные модели для генерации молекул',
		areaId: 'ml',
		sources: 12,
		notes: 3,
		updated: '2 weeks ago',
		updatedRu: '2 недели назад',
		excerpt:
			'Comparing EDM, DiffDock, GeoLDM on protein-ligand pose prediction.',
		excerptRu:
			'Сравнение EDM, DiffDock, GeoLDM для предсказания позы белок-лиганд.'
	}
];

export const MOCK_PUBLIC_NOTEBOOKS: MockNotebook[] = MOCK_NOTEBOOKS.slice(0, 5);

export const MOCK_SOURCES: MockSource[] = [
	{
		id: 's1',
		title:
			'An Image is Worth 16×16 Words: Transformers for Image Recognition at Scale',
		authors: 'Dosovitskiy et al.',
		venue: 'ICLR 2021',
		year: 2021,
		cited: 42318,
		selected: true,
		type: 'paper'
	},
	{
		id: 's2',
		title:
			'Swin Transformer: Hierarchical Vision Transformer using Shifted Windows',
		authors: 'Liu, Lin, Cao et al.',
		venue: 'ICCV 2021',
		year: 2021,
		cited: 18902,
		selected: true,
		type: 'paper'
	},
	{
		id: 's3',
		title: 'MaxViT: Multi-Axis Vision Transformer',
		authors: 'Tu, Talebi, Zhang et al.',
		venue: 'ECCV 2022',
		year: 2022,
		cited: 1204,
		selected: true,
		type: 'paper'
	},
	{
		id: 's4',
		title: 'Training data-efficient image transformers & distillation',
		authors: 'Touvron, Cord, Douze et al.',
		venue: 'ICML 2021',
		year: 2021,
		cited: 8641,
		selected: false,
		type: 'paper'
	},
	{
		id: 's5',
		title:
			'Tokens-to-Token ViT: Training Vision Transformers from Scratch on ImageNet',
		authors: 'Yuan, Chen, Wang et al.',
		venue: 'ICCV 2021',
		year: 2021,
		cited: 1577,
		selected: true,
		type: 'paper'
	},
	{
		id: 's6',
		title: 'BEiT: BERT Pre-Training of Image Transformers',
		authors: 'Bao, Dong, Wei',
		venue: 'ICLR 2022',
		year: 2022,
		cited: 3412,
		selected: false,
		type: 'paper'
	},
	{
		id: 's7',
		title: 'Lab notes — Q3 ablation runs',
		authors: 'A. Sokolova',
		venue: 'internal',
		year: 2025,
		cited: null,
		selected: true,
		type: 'note'
	},
	{
		id: 's8',
		title: 'CvT: Introducing Convolutions to Vision Transformers',
		authors: 'Wu, Xiao, Codella et al.',
		venue: 'ICCV 2021',
		year: 2021,
		cited: 2010,
		selected: false,
		type: 'paper'
	}
];

export const MOCK_CHAT: MockChatMessage[] = [
	{
		role: 'user',
		text: 'How does shifted window attention in Swin reduce computational cost compared to global self-attention in ViT?',
		textRu:
			'Как сдвинутые окна attention в Swin сокращают вычисления по сравнению с глобальным self-attention в ViT?'
	},
	{
		role: 'assistant',
		text: 'Global self-attention in ViT has O(N²) complexity in the number of patch tokens. Swin partitions the image into non-overlapping windows of M×M patches and computes attention only within each window, reducing complexity to O(MN). The "shift" — alternating the window grid by ⌊M/2⌋ between layers — restores cross-window connections without paying the global cost.',
		textRu:
			'Глобальный self-attention в ViT имеет сложность O(N²) по числу патч-токенов. Swin делит изображение на непересекающиеся окна M×M патчей и считает attention только внутри каждого окна, снижая сложность до O(MN). «Сдвиг» — чередование сетки окон на ⌊M/2⌋ между слоями — восстанавливает связи между окнами без оплаты глобальной цены.',
		cites: [
			{ id: 's2', label: 'Liu et al., 2021', frag: 'Sec. 3.2' },
			{ id: 's1', label: 'Dosovitskiy et al., 2021', frag: 'Eq. 1' }
		]
	},
	{
		role: 'user',
		text: 'Which approach scales best to 4K imagery?',
		textRu: 'Какой подход лучше масштабируется на 4K-изображения?'
	},
	{
		role: 'assistant',
		text: "MaxViT's grid-window dual attention shows the most favorable scaling for high-resolution inputs in your selected sources. It alternates block-attention (local) with grid-attention (sparse global), achieving linear complexity in image size while preserving long-range receptive fields. Ablations in Sec. 4.2 show a 3.1× memory reduction at 1024² compared to Swin-L.",
		textRu:
			'Двойной attention MaxViT (grid-window) показывает лучшее масштабирование на высоких разрешениях среди выбранных источников. Он чередует block-attention (локальный) с grid-attention (разрежённо-глобальным), обеспечивая линейную сложность по размеру изображения при сохранении дальнодействующих рецептивных полей. Абляция в Sec. 4.2 показывает 3.1× сокращение памяти на 1024² по сравнению со Swin-L.',
		cites: [{ id: 's3', label: 'Tu et al., 2022', frag: 'Sec. 4.2' }]
	}
];

export const MOCK_SUMMARY: MockSummary = {
	bullets: [
		'Three families dominate: global (ViT), windowed (Swin), and multi-axis (MaxViT) — trading receptive field for compute.',
		'Window-shift restores cross-region context without O(N²) cost; remains the most-cited efficient ViT design.',
		'For ≥1K² inputs, multi-axis attention shows the best memory/accuracy curve in the cited benchmarks.',
		'Convolutional inductive biases (CvT, T2T) help low-data regimes but plateau above ImageNet-21k scale.'
	],
	bulletsRu: [
		'Доминируют три семейства: глобальное (ViT), оконное (Swin) и многоосевое (MaxViT) — каждое меняет рецептивное поле на вычисления.',
		'Сдвиг окон восстанавливает межрегиональный контекст без цены O(N²); остаётся самым цитируемым эффективным дизайном ViT.',
		'Для входов ≥1K² многоосевой attention показывает лучшую кривую память/точность в цитируемых бенчмарках.',
		'Свёрточные индуктивные смещения (CvT, T2T) помогают на малых данных, но выходят на плато выше масштаба ImageNet-21k.'
	],
	questions: [
		"What's the accuracy gap between windowed and global attention on ImageNet-1k?",
		'How do these methods compare on medical imaging (3D volumes)?',
		'Is there a unified theory of attention sparsity patterns?'
	],
	questionsRu: [
		'Какова разница в точности между оконным и глобальным attention на ImageNet-1k?',
		'Как эти методы сравниваются на медицинской визуализации (3D-объёмы)?',
		'Существует ли единая теория паттернов разреженности attention?'
	]
};

export const MOCK_NOTES: MockNote[] = [
	{
		title: 'Q3 ablation — window size sweep',
		titleRu: 'Q3 абляция — свип размера окна',
		body: 'M=7 → 12 yields +0.8 acc but 2.1× memory. Sweet spot at M=10 for our 768² inputs.',
		bodyRu:
			'M=7 → 12 даёт +0.8 acc, но 2.1× памяти. Оптимум при M=10 для наших входов 768².',
		date: 'today',
		dateRu: 'сегодня'
	},
	{
		title: 'Re: Sec 3.2 of Swin',
		titleRu: 'К Sec 3.2 Swin',
		body: 'Need to double-check the shifted partition equation. Paper says ⌊M/2⌋ but reference impl uses M/2 floor on torch.roll.',
		bodyRu:
			'Нужно перепроверить уравнение сдвига. В статье ⌊M/2⌋, но в reference impl используется M/2 floor через torch.roll.',
		date: 'yesterday',
		dateRu: 'вчера'
	},
	{
		title: 'Reading queue',
		titleRu: 'Очередь чтения',
		body: 'CrossViT, RegionViT, PVT v2. Maybe DETR baselines if time.',
		bodyRu: 'CrossViT, RegionViT, PVT v2. Возможно DETR baselines, если будет время.',
		date: '3 days ago',
		dateRu: '3 дня назад'
	}
];
