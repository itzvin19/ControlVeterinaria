import { useForm } from "react-hook-form"
import { Error } from "./Error"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function PatientForm() {

    const addPatient =usePatientStore(state=>state.addPatient)
    const updatePatient =usePatientStore(state=>state.updatePatient)
    const activeId =usePatientStore(state=>state.activeId)
    const patients =usePatientStore(state=>state.patients)

    const { register, handleSubmit, formState: { errors }, setValue, reset} = useForm<DraftPatient>()

    useEffect(()=>{
        if(activeId){
            const selectedPatient=patients.filter(patient=>patient.id===activeId)[0]
            setValue("name",selectedPatient.name)
            setValue("caretaker",selectedPatient.caretaker)
            setValue("email",selectedPatient.email)
            setValue("date",selectedPatient.date)
            setValue("symptoms",selectedPatient.symptoms)
        }
    },[activeId])

    const registerPaciente = (data:DraftPatient) => {
        if(activeId){
            updatePatient(data)
            toast.info('Paciente editado')
        }else{
            addPatient(data)
            toast.success('Paciente agregado correctamente')
        }
        reset()
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit={handleSubmit(registerPaciente)}
                noValidate
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: "El nombre del paciente es obligatorio"
                        })}
                    />
                </div>

                {errors.name && (
                    <Error>{errors.name?.message}</Error>
                )}

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register("caretaker", {
                            required: "El nombre del propietario es obligatorio"

                        })}
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email no válido"
                            }
                        })}
                    />
                </div>

                {errors.email&&(
                    <Error>{errors.email?.message}</Error>
                )}

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register("date", {
                            required: "La Fecha de alta es obligatoria"
                        })}
                    />
                </div>

                {errors.date && (
                    <Error>{errors.date?.message}</Error>
                )}

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register("symptoms", {
                            required: "Los síntomas son obligatorios"
                        })}
                    />
                </div>

                {errors.symptoms && (
                    <Error>{errors.symptoms?.message}</Error>
                )}

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}