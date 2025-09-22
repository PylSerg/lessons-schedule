// Розклад уроків
const schedule = {
	Monday: {
		L0: "",
		L1: "",
		L2: "7-Г - Алгебра",
		L3: "6-Г - Математика",
		L4: "6-Г - Математика",
		L5: "5-Г - Математика",
		L6: "7-Г - Алгебра",
		L7: "9-Д - Інформатика",
		L8: "",
	},

	Tuesday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "7-Г - Геометрія",
		L4: "8-Є - Інформатика",
		L5: "6-Г - Математика",
		L6: "",
		L7: "7-Г - Геометрія",
		L8: "",
	},

	Wednesday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "",
		L4: "",
		L5: "5-Г - Математика",
		L6: "6-Г - Математика",
		L7: "8-Є - Інформатика",
		L8: "",
	},

	Thursday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "7-Г - Фізика",
		L4: "7-Г - Фізика",
		L5: "5-Г - Математика",
		L6: "7-Г - Інформатика",
		L7: "6-Г - Інформатика",
		L8: "",
	},

	Friday: {
		L0: "",
		L1: "",
		L2: "",
		L3: "9-Д - Інформатика",
		L4: "5-Г - Математика",
		L5: "5-Г - Інформатика",
		L6: "7-Г - Інформатика",
		L7: "6-Г - Інформатика",
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
	L0: ["15", "30", "15", "55"],
	L1: ["16", "00", "16", "30"],
	L2: ["16", "35", "17", "05"],
	L3: ["17", "10", "17", "40"],
	L4: ["17", "45", "18", "15"],
	L5: ["18", "20", "18", "50"],
	L6: ["18", "55", "19", "25"],
	L7: ["19", "30", "20", "00"],
	L8: ["20", "05", "20", "35"],
};

let is_schedule_shown = true; // Змінна для відстеження стану розкладу
let checker; // Змінна для зберігання інтервалу перевірки уроків

const ref_root = document.getElementById("root");

const date = new Date();
const day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const current_day = day_names[date.getDay()];

let number_lesson = 0;
let lesson = "L" + number_lesson;

if (window.clientInformation.userAgentData.mobile) ref_root.style.fontSize = "10vh";

function showSchedule() {
	ref_root.style.justifyContent = "start";
	ref_root.style.color = "#ccc";

	ref_root.innerHTML = `
		<table style="margin:10px">
			<tr>
				<th>Урок</th>
				<th>Назва</th>
				<th>Початок</th>
				<th>Кінець</th>
			</tr>

			<tr>
				<td>0</td>
				<td style="text-align:left">${schedule[current_day].L0}</td>
				<td>${bells.L0[0]}:${bells.L0[1]}</td>
				<td>${bells.L0[2]}:${bells.L0[3]}</td>
			</tr>

			<tr>
				<td>1</td>
				<td style="text-align:left">${schedule[current_day].L1}</td>
				<td>${bells.L1[0]}:${bells.L1[1]}</td>
				<td>${bells.L1[2]}:${bells.L1[3]}</td>
			</tr>

			<tr>
				<td>2</td>
				<td style="text-align:left">${schedule[current_day].L2}</td>
				<td>${bells.L2[0]}:${bells.L2[1]}</td>
				<td>${bells.L2[2]}:${bells.L2[3]}</td>
			</tr>	

			<tr>
				<td>3</td>
				<td style="text-align:left">${schedule[current_day].L3}</td>
				<td>${bells.L3[0]}:${bells.L3[1]}</td>
				<td>${bells.L3[2]}:${bells.L3[3]}</td>
			</tr>	

			<tr>
				<td>4</td>
				<td style="text-align:left">${schedule[current_day].L4}</td>
				<td>${bells.L4[0]}:${bells.L4[1]}</td>
				<td>${bells.L4[2]}:${bells.L4[3]}</td>
			</tr>

			<tr>
				<td>5</td>
				<td style="text-align:left">${schedule[current_day].L5}</td>
				<td>${bells.L5[0]}:${bells.L5[1]}</td>
				<td>${bells.L5[2]}:${bells.L5[3]}</td>
			</tr>	

			<tr>
				<td>6</td>
				<td style="text-align:left">${schedule[current_day].L6}</td>
				<td>${bells.L6[0]}:${bells.L6[1]}</td>
				<td>${bells.L6[2]}:${bells.L6[3]}</td>
			</tr>

			<tr>
				<td>7</td>
				<td style="text-align:left">${schedule[current_day].L7}</td>
				<td>${bells.L7[0]}:${bells.L7[1]}</td>
				<td>${bells.L7[2]}:${bells.L7[3]}</td>
			</tr>	

			<tr>
				<td>8</td>
				<td style="text-align:left">${schedule[current_day].L8}</td>
				<td>${bells.L8[0]}:${bells.L8[1]}</td>
				<td>${bells.L8[2]}:${bells.L8[3]}</td>
			</tr>
		</table>

		<br><span style="color:#555;font-style:italic;margin:10px">Натисніть ліву клавішу миші</span>
	`;
}

function checkLesson() {
	ref_root.style.justifyContent = "center";
	// Перевіряємо розклад уроків кожну секунду
	checker = setInterval(() => {
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
			<div>
				<span style="color:#777">${number_lesson}.</span> <span>${schedule[current_day][lesson]} о ${bells[lesson][0]}:${bells[lesson][1]}</span> 
				<br> 
				<span>До початку уроку: ${lesson_start - time_now} хв</span>
			</div>
		`;
		}

		// Якщо поточний час знаходиться в межах уроку, то виводимо повідомлення про залишок часу до закінчення уроку
		if (time_now >= lesson_start && time_now < lesson_end) {
			ref_root.innerHTML = `Залишилось: ${lesson_end - time_now} хв`;

			if (lesson_end - time_now > 5) {
				ref_root.style.color = "#00aa00";
			} else {
				ref_root.style.color = "#f1b307ff";
			}
		}

		// Якщо поточний час більший або рівний часу закінчення уроку, то переходимо до наступного уроку
		if (time_now >= lesson_end) {
			number_lesson++;
			lesson = "L" + number_lesson;

			ref_root.style.backgroundColor = "red";
			ref_root.style.color = "#ccc";

			return;
		}
	}, 1000);
}

showSchedule();

document.addEventListener("click", () => {
	ref_root.innerHTML = "Завантаження...";

	if (is_schedule_shown) {
		checkLesson();
	} else {
		clearInterval(checker);
		showSchedule();
	}

	is_schedule_shown = !is_schedule_shown;
});
