// Розклад уроків
const schedule = {
	Monday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},

	Tuesday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},

	Wednesday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},

	Thursday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},

	Friday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},

	Saturday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},

	Sunday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "",
		L6: "",
		L7: "",
		L8: "",
	},
};

// Розклад дзвінків
// Формат: ["година початку", "хвилина початку", "година закінчення", "хвилина закінчення"]
const bells = {
	L0: ["15", "25", "15", "55"],
	L1: ["16", "00", "16", "30"],
	L2: ["16", "35", "17", "05"],
	L3: ["17", "10", "17", "40"],
	L4: ["17", "45", "18", "15"],
	L5: ["18", "20", "18", "50"],
	L6: ["18", "55", "19", "25"],
	L7: ["19", "30", "20", "00"],
	L8: ["20", "05", "20", "35"],
};

const ref_root = document.getElementById("root");

const date = new Date();
const day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const current_day = day_names[date.getDay()];

let number_lesson = 0;
let lesson = "L" + number_lesson;

// Перевіряємо розклад уроків кожну секунду
const checker = setInterval(() => {
	ref_root.style.backgroundColor = "transparent";

	// Пропускаємо уроки, які не мають назви
	while (schedule[current_day][lesson] === "") {
		number_lesson++;
		lesson = "L" + number_lesson;
	}

	// Якщо номер уроку перевищує кількість уроків у розкладі, то виводимо повідомлення і зупиняємо перевірку
	if (number_lesson == Object.keys(schedule[current_day]).length) {
		ref_root.innerHTML = "Уроків на сьогодні немає";
		clearInterval(checker);
		return;
	}

	// Отримуємо поточний час та час початку і закінчення уроку
	const date_now = new Date();
	const time_now = date_now.getHours() * 60 + date_now.getMinutes();
	const lesson_start = Number(bells[lesson][0]) * 60 + Number(bells[lesson][1]);
	const lesson_end = Number(bells[lesson][2]) * 60 + Number(bells[lesson][3]);

	// Якщо поточний час менший за час початку уроку, то виводимо повідомлення про залишок часу до початку уроку
	if (time_now < lesson_start) {
		ref_root.innerHTML = `
			${schedule[current_day][lesson]} о ${bells[lesson][0]}:${bells[lesson][1]} 
			<br> 
			До початку уроку: ${lesson_start - time_now} хв
		`;
	}

	// Якщо поточний час знаходиться в межах уроку, то виводимо повідомлення про залишок часу до закінчення уроку
	if (time_now >= lesson_start && time_now < lesson_end) {
		ref_root.innerHTML = `Залишилось: ${lesson_end - time_now} хв`;
	}

	// Якщо поточний час більший або рівний часу закінчення уроку, то переходимо до наступного уроку
	if (time_now >= lesson_end) {
		number_lesson++;
		lesson = "L" + number_lesson;

		ref_root.style.backgroundColor = "red";

		return;
	}
}, 1000);
