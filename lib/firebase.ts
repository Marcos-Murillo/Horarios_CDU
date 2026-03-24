import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDtaJmD9Bhr1fikfqX94h9ANWjMv8LHF4M",
  authDomain: "horarioscdu.firebaseapp.com",
  projectId: "horarioscdu",
  storageBucket: "horarioscdu.firebasestorage.app",
  messagingSenderId: "771594365234",
  appId: "1:771594365234:web:8473926463e9db87e5cf2b",
  measurementId: "G-3XDVZK5ZNJ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Types for our data structures
export interface Schedule {
  id?: string
  groupName: string
  startTime: string
  endTime: string
  dayOfWeek: string
  subGroup?: string // semillero, proceso, or representativo
  lugar?: string
  color: string
}

export interface CulturalGroup {
  id: string
  name: string
  shortName: string
  logo: string
  background: string
  color: string
}

export const CULTURAL_GROUPS: CulturalGroup[] = [
  { id: "ajedrez-representativo", name: "Ajedrez Representativo", shortName: "Ajedrez Rep.", logo: "", background: "", color: "#1A6BAD" },
  { id: "ajedrez-funcionarios", name: "Ajedrez Funcionarios", shortName: "Ajedrez Func.", logo: "", background: "", color: "#2980B9" },
  { id: "ajedrez-semillero", name: "Ajedrez Semillero", shortName: "Ajedrez Sem.", logo: "", background: "", color: "#5DADE2" },
  { id: "atletismo-representativo", name: "Atletismo Representativo Estudiantes y Funcionarios", shortName: "Atletismo Rep.", logo: "", background: "", color: "#E8A020" },
  { id: "atletismo-semillero", name: "Atletismo Semillero", shortName: "Atletismo Sem.", logo: "", background: "", color: "#F39C12" },
  { id: "baloncesto-representativo", name: "Baloncesto Representativo", shortName: "Baloncesto Rep.", logo: "", background: "", color: "#E74C3C" },
  { id: "baloncesto-funcionarios", name: "Baloncesto Funcionarios", shortName: "Baloncesto Func.", logo: "", background: "", color: "#C0392B" },
  { id: "balonmano", name: "Balonmano Representativo Femenino y Masculino", shortName: "Balonmano", logo: "", background: "", color: "#8E44AD" },
  { id: "bolos", name: "Bolos Funcionarios Femenino y Masculino", shortName: "Bolos", logo: "", background: "", color: "#6C3483" },
  { id: "futbol-femenino", name: "Fútbol Femenino Representativo", shortName: "Fútbol Fem. Rep.", logo: "", background: "", color: "#27AE60" },
  { id: "futbol-masculino-rep", name: "Fútbol Masculino Representativo", shortName: "Fútbol Masc. Rep.", logo: "", background: "", color: "#1E8449" },
  { id: "futbol-masculino-sem", name: "Fútbol Masculino Semillero", shortName: "Fútbol Masc. Sem.", logo: "", background: "", color: "#2ECC71" },
  { id: "futbol-master", name: "Fútbol Master", shortName: "Fútbol Master", logo: "", background: "", color: "#117A65" },
  { id: "futbol-libre", name: "Fútbol Libre", shortName: "Fútbol Libre", logo: "", background: "", color: "#1ABC9C" },
  { id: "futbol-sala-femenino", name: "Fútbol Sala Femenino Representativo y Semillero", shortName: "Fútbol Sala Fem.", logo: "", background: "", color: "#D35400" },
  { id: "futbol-sala-masculino-rep", name: "Fútbol Sala Masculino Representativo", shortName: "Fútbol Sala Masc. Rep.", logo: "", background: "", color: "#E67E22" },
  { id: "futbol-sala-masculino-func", name: "Fútbol Sala Masculino Funcionarios", shortName: "Fútbol Sala Func.", logo: "", background: "", color: "#F0B27A" },
  { id: "judo", name: "Judo", shortName: "Judo", logo: "", background: "", color: "#2C3E50" },
  { id: "karate", name: "Karate Do", shortName: "Karate Do", logo: "", background: "", color: "#E74C3C" },
  { id: "muay-thai", name: "Muay Thai y Sanda", shortName: "Muay Thai y Sanda", logo: "", background: "", color: "#C0392B" },
  { id: "natacion-rep", name: "Natación Representativo Femenino y Masculino", shortName: "Natación Rep.", logo: "", background: "", color: "#1A6BAD" },
  { id: "natacion-sem", name: "Natación Semillero Femenino y Masculino", shortName: "Natación Sem.", logo: "", background: "", color: "#2980B9" },
  { id: "natacion-func", name: "Natación Funcionarios", shortName: "Natación Func.", logo: "", background: "", color: "#5DADE2" },
  { id: "natacion-aletas", name: "Natación con Aletas", shortName: "Natación Aletas", logo: "", background: "", color: "#85C1E9" },
  { id: "patinaje-rep", name: "Patinaje Representativo", shortName: "Patinaje Rep.", logo: "", background: "", color: "#8E44AD" },
  { id: "patinaje-sem", name: "Patinaje Semillero", shortName: "Patinaje Sem.", logo: "", background: "", color: "#A569BD" },
  { id: "polo-acuatico-fem", name: "Polo Acuático Femenino", shortName: "Polo Acuático Fem.", logo: "", background: "", color: "#1A6BAD" },
  { id: "polo-acuatico-masc", name: "Polo Acuático Masculino", shortName: "Polo Acuático Masc.", logo: "", background: "", color: "#2471A3" },
  { id: "porrismo-rep", name: "Porrismo Representativo", shortName: "Porrismo Rep.", logo: "", background: "", color: "#E8A020" },
  { id: "porrismo-sem", name: "Porrismo Semillero", shortName: "Porrismo Sem.", logo: "", background: "", color: "#F4D03F" },
  { id: "rugby-fem", name: "Rugby Femenino Representativo y Semillero", shortName: "Rugby Fem.", logo: "", background: "", color: "#27AE60" },
  { id: "rugby-masc-rep", name: "Rugby Masculino Representativo", shortName: "Rugby Masc. Rep.", logo: "", background: "", color: "#1E8449" },
  { id: "rugby-masc-sem", name: "Rugby Masculino Semillero", shortName: "Rugby Masc. Sem.", logo: "", background: "", color: "#2ECC71" },
  { id: "rugby-prep", name: "Rugby Masculino - Preparación Física", shortName: "Rugby Prep. Física", logo: "", background: "", color: "#117A65" },
  { id: "sapo", name: "Sapo Funcionarios Femenino y Masculino Sintraunicol", shortName: "Sapo Sintraunicol", logo: "", background: "", color: "#D4AC0D" },
  { id: "taekwondo", name: "Taekwondo Representativo Femenino, Masculino y Semillero", shortName: "Taekwondo", logo: "", background: "", color: "#C0392B" },
  { id: "tejo-sintraunicol", name: "Tejo Funcionarios Sintraunicol", shortName: "Tejo Sintraunicol", logo: "", background: "", color: "#6E2F1A" },
  { id: "mini-tejo-sintraunicol", name: "Mini Tejo Funcionarios Sintraunicol", shortName: "Mini Tejo Sintraunicol", logo: "", background: "", color: "#873600" },
  { id: "mini-tejo-sintraempuvalle", name: "Mini Tejo Funcionarios Sintraempuvalle", shortName: "Mini Tejo Sintraempuvalle", logo: "", background: "", color: "#A04000" },
  { id: "tenis-campo-rep", name: "Tenis de Campo Representativo Femenino y Masculino / Semillero Femenino y Masculino", shortName: "Tenis Campo Rep.", logo: "", background: "", color: "#1E8449" },
  { id: "tenis-campo-func", name: "Tenis de Campo Funcionarios", shortName: "Tenis Campo Func.", logo: "", background: "", color: "#27AE60" },
  { id: "tenis-mesa-rep", name: "Tenis de Mesa Representativo Femenino y Masculino", shortName: "Tenis Mesa Rep.", logo: "", background: "", color: "#2980B9" },
  { id: "tenis-mesa-func", name: "Tenis de Mesa Funcionarios", shortName: "Tenis Mesa Func.", logo: "", background: "", color: "#5DADE2" },
  { id: "ultimate-rep", name: "Ultimate Representativo Femenino y Masculino", shortName: "Ultimate Rep.", logo: "", background: "", color: "#8E44AD" },
  { id: "ultimate-sem", name: "Ultimate Semillero", shortName: "Ultimate Sem.", logo: "", background: "", color: "#A569BD" },
  { id: "voleibol-sintraunicol-fem", name: "Voleibol Funcionarias Sintraunicol Femenino", shortName: "Voleibol Sintraunicol Fem.", logo: "", background: "", color: "#E74C3C" },
  { id: "voleibol-func-fem", name: "Voleibol Funcionarias Femenino", shortName: "Voleibol Func. Fem.", logo: "", background: "", color: "#C0392B" },
  { id: "voleibol-func-masc", name: "Voleibol Funcionarios Masculino", shortName: "Voleibol Func. Masc.", logo: "", background: "", color: "#E8A020" },
  { id: "voleibol-rep", name: "Voleibol Representativo Femenino y Masculino", shortName: "Voleibol Rep.", logo: "", background: "", color: "#D35400" },
  { id: "voleibol-sem", name: "Voleibol Semillero", shortName: "Voleibol Sem.", logo: "", background: "", color: "#F39C12" },
  { id: "voleibol-arena-rep", name: "Voleibol Arena Representativo", shortName: "Voleibol Arena Rep.", logo: "", background: "", color: "#F4D03F" },
  { id: "voleibol-arena-sem", name: "Voleibol Arena Semillero", shortName: "Voleibol Arena Sem.", logo: "", background: "", color: "#D4AC0D" },
  { id: "voleibol-arena-func", name: "Voleibol Arena Funcionarios", shortName: "Voleibol Arena Func.", logo: "", background: "", color: "#B7950B" },
]

export const getGroupById = (id: string): CulturalGroup | undefined => {
  return CULTURAL_GROUPS.find((group) => group.id === id)
}

export const getGroupByName = (name: string): CulturalGroup | undefined => {
  return CULTURAL_GROUPS.find((group) => group.name === name)
}

export const generateGroupColor = (groupName: string) => {
  const group = getGroupByName(groupName)
  return group ? group.color : "#059669"
}

// Firestore functions
export const addSchedule = async (schedule: Omit<Schedule, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), schedule)
    return docRef.id
  } catch (error) {
    console.error("Error adding schedule:", error)
    throw error
  }
}

export const getSchedules = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "schedules"))
    const schedules: Schedule[] = []
    querySnapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() } as Schedule)
    })
    return schedules
  } catch (error) {
    console.error("Error getting schedules:", error)
    throw error
  }
}

export const getSchedulesByGroup = async (groupName: string) => {
  try {
    const q = query(collection(db, "schedules"), where("groupName", "==", groupName))
    const querySnapshot = await getDocs(q)
    const schedules: Schedule[] = []
    querySnapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() } as Schedule)
    })
    return schedules
  } catch (error) {
    console.error("Error getting schedules by group:", error)
    throw error
  }
}

export const updateSchedule = async (id: string, schedule: Partial<Schedule>) => {
  try {
    const scheduleRef = doc(db, "schedules", id)
    await updateDoc(scheduleRef, schedule)
  } catch (error) {
    console.error("Error updating schedule:", error)
    throw error
  }
}

export const deleteSchedule = async (id: string) => {
  try {
    await deleteDoc(doc(db, "schedules", id))
  } catch (error) {
    console.error("Error deleting schedule:", error)
    throw error
  }
}
