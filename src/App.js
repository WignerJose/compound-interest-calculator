import { Formik,Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Container from './components/Container'
import Section from './components/Section'
import Input from './components/Input'
import Button from './components/Button'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i <years; i++){
    total = (total + contribution)* (rate + 1)
  }
  return Math.round(total)
}

const Formatter = Intl.NumberFormat('en-US',{
  style:'currency',
  currency:'USD',
  minimumFractionDigits:2,
  maximumFractionDigits:2,
})

function App() {
  const [balance,setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit),Number(contribution),Number(years),Number(rate))
    setBalance(Formatter.format(val))  
   }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Dene ser un numero'),
            contribution: Yup.number().required('Obligatorio').typeError('Dene ser un numero'),
            years: Yup.number().required('Obligatorio').typeError('Dene ser un numero'),
            rate: Yup.number()
                  .required('Obligatorio')
                  .typeError('Dene ser un numero')
                  .min(0,'El valor minimo es 0')
                  .max(1,'El valor maximo es 1'),
          })}
        >
          <Form>
            <Input name="deposit" label="Deposito inicial"/>
            <Input name="contribution" label="Contribucion Anual"/>
            <Input name="years" label="Años"/>
            <Input name="rate" label="Interes Estimado"/>
            <Button type="submit">Calcular</Button>
            {balance !== ''? <Balance>Balance final : {balance}</Balance>:null}
          </Form>
        </Formik>
      </Section>
    </Container>
  );
}

export default App;
