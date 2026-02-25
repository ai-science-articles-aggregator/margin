<script lang="ts">
	interface Props {
		username?: string;
		fullName?: string | null;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { username = '', fullName = null, size = 'md', class: className = '' }: Props = $props();

	// Размер аватара
	const sizeClasses = {
		sm: 'w-8 h-8 text-xs',
		md: 'w-9 h-9 text-sm',
		lg: 'w-12 h-12 text-base'
	};

	// Получаем инициалы (первая буква)
	function getInitials(): string {
		const text = fullName || username || '?';
		// Убираем специальные символы и приводим к верхнему регистру
		const cleanText = (text || '').replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '').toUpperCase();

		return cleanText.charAt(0) || '?';
	}

	// Генерируем цвет на основе первой буквы
	function getColors(): string {
		const text = fullName || username || '?';
		const cleanText = (text || '').replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '').toUpperCase();

		if (cleanText.length === 0) {
			return 'bg-gray-500 text-white';
		}

		// Берем первую букву для вычисления цвета
		const char1 = cleanText.charCodeAt(0) || 0;

		// Вычисляем индекс цвета (0-7)
		const colorIndex = char1 % 8;

		const colors = [
			'bg-red-500 text-white',
			'bg-orange-500 text-white',
			'bg-amber-500 text-white',
			'bg-green-500 text-white',
			'bg-emerald-500 text-white',
			'bg-teal-500 text-white',
			'bg-blue-500 text-white',
			'bg-violet-500 text-white'
		];

		return colors[colorIndex];
	}

	let initials = $derived(getInitials());
	let avatarColors = $derived(getColors());
</script>

<div class={`rounded-full flex items-center justify-center font-bold shadow-md ${sizeClasses[size]} ${avatarColors} ${className}`}>
	{initials}
</div>
