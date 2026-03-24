export const CULTURAL_GROUPS = [
  "Ajedrez Representativo",
  "Ajedrez Funcionarios",
  "Ajedrez Semillero",
  "Atletismo Representativo Estudiantes y Funcionarios",
  "Atletismo Semillero",
  "Baloncesto Representativo",
  "Baloncesto Funcionarios",
  "Balonmano Representativo Femenino y Masculino",
  "Bolos Funcionarios Femenino y Masculino",
  "Fútbol Femenino Representativo",
  "Fútbol Masculino Representativo",
  "Fútbol Masculino Semillero",
  "Fútbol Master",
  "Fútbol Libre",
  "Fútbol Sala Femenino Representativo y Semillero",
  "Fútbol Sala Masculino Representativo",
  "Fútbol Sala Masculino Funcionarios",
  "Judo",
  "Karate Do",
  "Muay Thai y Sanda",
  "Natación Representativo Femenino y Masculino",
  "Natación Semillero Femenino y Masculino",
  "Natación Funcionarios",
  "Natación con Aletas",
  "Patinaje Representativo",
  "Patinaje Semillero",
  "Polo Acuático Femenino",
  "Polo Acuático Masculino",
  "Porrismo Representativo",
  "Porrismo Semillero",
  "Rugby Femenino Representativo y Semillero",
  "Rugby Masculino Representativo",
  "Rugby Masculino Semillero",
  "Rugby Masculino - Preparación Física",
  "Sapo Funcionarios Femenino y Masculino Sintraunicol",
  "Taekwondo Representativo Femenino, Masculino y Semillero",
  "Tejo Funcionarios Sintraunicol",
  "Mini Tejo Funcionarios Sintraunicol",
  "Mini Tejo Funcionarios Sintraempuvalle",
  "Tenis de Campo Representativo Femenino y Masculino / Semillero Femenino y Masculino",
  "Tenis de Campo Funcionarios",
  "Tenis de Mesa Representativo Femenino y Masculino",
  "Tenis de Mesa Funcionarios",
  "Ultimate Representativo Femenino y Masculino",
  "Ultimate Semillero",
  "Voleibol Funcionarias Sintraunicol Femenino",
  "Voleibol Funcionarias Femenino",
  "Voleibol Funcionarios Masculino",
  "Voleibol Representativo Femenino y Masculino",
  "Voleibol Semillero",
  "Voleibol Arena Representativo",
  "Voleibol Arena Semillero",
  "Voleibol Arena Funcionarios",
]

export interface Schedule {
  id: string
  groupName: string
  day: string
  startTime: string
  endTime: string
  subGroup?: "semillero" | "proceso" | "representativo"
  createdAt: Date
  updatedAt: Date
}

export const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export const GROUP_COLORS = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-chart-6",
  "bg-chart-7",
  "bg-chart-8",
]

export function getGroupColor(groupName: string): string {
  const index = CULTURAL_GROUPS.indexOf(groupName) % GROUP_COLORS.length
  return GROUP_COLORS[index]
}

export function getShortGroupName(fullName: string): string {
  if (fullName.includes("Ajedrez Representativo")) return "Ajedrez Rep."
  if (fullName.includes("Ajedrez Funcionarios")) return "Ajedrez Func."
  if (fullName.includes("Ajedrez Semillero")) return "Ajedrez Sem."
  if (fullName.includes("Atletismo Representativo")) return "Atletismo Rep."
  if (fullName.includes("Atletismo Semillero")) return "Atletismo Sem."
  if (fullName.includes("Baloncesto Representativo")) return "Baloncesto Rep."
  if (fullName.includes("Baloncesto Funcionarios")) return "Baloncesto Func."
  if (fullName.includes("Balonmano")) return "Balonmano"
  if (fullName.includes("Bolos")) return "Bolos"
  if (fullName.includes("Fútbol Femenino")) return "Fútbol Fem. Rep."
  if (fullName.includes("Fútbol Masculino Representativo")) return "Fútbol Masc. Rep."
  if (fullName.includes("Fútbol Masculino Semillero")) return "Fútbol Masc. Sem."
  if (fullName.includes("Fútbol Master")) return "Fútbol Master"
  if (fullName.includes("Fútbol Libre")) return "Fútbol Libre"
  if (fullName.includes("Fútbol Sala Femenino")) return "Fútbol Sala Fem."
  if (fullName.includes("Fútbol Sala Masculino Representativo")) return "Fútbol Sala Masc. Rep."
  if (fullName.includes("Fútbol Sala Masculino Funcionarios")) return "Fútbol Sala Func."
  if (fullName.includes("Judo")) return "Judo"
  if (fullName.includes("Karate")) return "Karate Do"
  if (fullName.includes("Muay Thai")) return "Muay Thai y Sanda"
  if (fullName.includes("Natación Representativo")) return "Natación Rep."
  if (fullName.includes("Natación Semillero")) return "Natación Sem."
  if (fullName.includes("Natación Funcionarios")) return "Natación Func."
  if (fullName.includes("Natación con Aletas")) return "Natación Aletas"
  if (fullName.includes("Patinaje Representativo")) return "Patinaje Rep."
  if (fullName.includes("Patinaje Semillero")) return "Patinaje Sem."
  if (fullName.includes("Polo Acuático Femenino")) return "Polo Acuático Fem."
  if (fullName.includes("Polo Acuático Masculino")) return "Polo Acuático Masc."
  if (fullName.includes("Porrismo Representativo")) return "Porrismo Rep."
  if (fullName.includes("Porrismo Semillero")) return "Porrismo Sem."
  if (fullName.includes("Rugby Femenino")) return "Rugby Fem."
  if (fullName.includes("Rugby Masculino Representativo")) return "Rugby Masc. Rep."
  if (fullName.includes("Rugby Masculino Semillero")) return "Rugby Masc. Sem."
  if (fullName.includes("Rugby Masculino - Preparación")) return "Rugby Prep. Física"
  if (fullName.includes("Sapo")) return "Sapo Sintraunicol"
  if (fullName.includes("Taekwondo")) return "Taekwondo"
  if (fullName.includes("Tejo Funcionarios Sintraunicol")) return "Tejo Sintraunicol"
  if (fullName.includes("Mini Tejo Funcionarios Sintraunicol")) return "Mini Tejo Sintraunicol"
  if (fullName.includes("Mini Tejo Funcionarios Sintraempuvalle")) return "Mini Tejo Sintraempuvalle"
  if (fullName.includes("Tenis de Campo Representativo")) return "Tenis Campo Rep."
  if (fullName.includes("Tenis de Campo Funcionarios")) return "Tenis Campo Func."
  if (fullName.includes("Tenis de Mesa Representativo")) return "Tenis Mesa Rep."
  if (fullName.includes("Tenis de Mesa Funcionarios")) return "Tenis Mesa Func."
  if (fullName.includes("Ultimate Representativo")) return "Ultimate Rep."
  if (fullName.includes("Ultimate Semillero")) return "Ultimate Sem."
  if (fullName.includes("Voleibol Funcionarias Sintraunicol")) return "Voleibol Sintraunicol Fem."
  if (fullName.includes("Voleibol Funcionarias Femenino")) return "Voleibol Func. Fem."
  if (fullName.includes("Voleibol Funcionarios Masculino")) return "Voleibol Func. Masc."
  if (fullName.includes("Voleibol Representativo")) return "Voleibol Rep."
  if (fullName.includes("Voleibol Semillero")) return "Voleibol Sem."
  if (fullName.includes("Voleibol Arena Representativo")) return "Voleibol Arena Rep."
  if (fullName.includes("Voleibol Arena Semillero")) return "Voleibol Arena Sem."
  if (fullName.includes("Voleibol Arena Funcionarios")) return "Voleibol Arena Func."
  return fullName
}
