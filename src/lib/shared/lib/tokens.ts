export type AreaId = 'ml' | 'bio' | 'phys' | 'neuro' | 'mat';

export interface Area {
	id: AreaId;
	en: string;
	ru: string;
	short_en: string;
	short_ru: string;
	colorVar: string;
}

export const AREAS: Area[] = [
	{
		id: 'ml',
		en: 'Machine Learning',
		ru: 'Машинное обучение',
		short_en: 'Machine Learning',
		short_ru: 'Машинное обучение',
		colorVar: 'var(--color-area-ml)'
	},
	{
		id: 'bio',
		en: 'Biochemistry',
		ru: 'Биохимия',
		short_en: 'Biochemistry',
		short_ru: 'Биохимия',
		colorVar: 'var(--color-area-bio)'
	},
	{
		id: 'phys',
		en: 'Condensed-matter Physics',
		ru: 'Физика конденсированных сред',
		short_en: 'Physics',
		short_ru: 'Физика',
		colorVar: 'var(--color-area-phys)'
	},
	{
		id: 'neuro',
		en: 'Neuroscience',
		ru: 'Нейронауки',
		short_en: 'Neuroscience',
		short_ru: 'Нейронауки',
		colorVar: 'var(--color-area-neuro)'
	},
	{
		id: 'mat',
		en: 'Materials Science',
		ru: 'Материаловедение',
		short_en: 'Materials Science',
		short_ru: 'Материаловедение',
		colorVar: 'var(--color-area-mat)'
	}
];

export function areaById(id: AreaId): Area {
	return AREAS.find((f) => f.id === id) ?? AREAS[0];
}
