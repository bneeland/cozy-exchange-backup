import Head from 'next/head'
import {
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { randomize, randomizePeople, getVectors } from '../helpers/assign'
import { sendEmail } from '../helpers/sendEmail'

const emptyPersonInput = { name: '', email: '' }
const emptyRuleInput = { from: '', to: '', type: '' }
const ruleTypes = [
  { id: 'inclusion', label: 'must give to' },
  { id: 'exclusion', label: 'must not give to' },
]

export default function App() {
  const [exchangeNameInput, setExchangeNameInput] = useState('')
  const [exchangeName, setExchangeName] = useState('')
  const [contactNameInput, setContactNameInput] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmailInput, setContactEmailInput] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [personInput, setPersonInput] = useState(emptyPersonInput)
  const [people, setPeople] = useState([])
  const [ruleInput, setRuleInput] = useState(emptyRuleInput)
  const [rules, setRules] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [message, setMessage] = useState('')

  function setExchangeHandler(e) {
    e.preventDefault()
    setExchangeName(exchangeNameInput)
    setExchangeNameInput('')
  }

  function setContactHandler(e) {
    e.preventDefault()
    setContactName(contactNameInput)
    setContactEmail(contactEmailInput)
    setContactNameInput('')
    setContactEmailInput('')
  }

  function createPersonHandler(e) {
    e.preventDefault()
    setPeople([...people, personInput])
    setPersonInput(emptyPersonInput)
  }

  function createRuleHandler(e) {
    e.preventDefault()
    setRules([...rules, ruleInput])
    setRuleInput(emptyRuleInput)
  }

  function createMessageHandler(e) {
    e.preventDefault()
    setMessage(messageInput)
    setMessageInput('')
  }

  function getPerson(email) {
    return people.find(person => person.email === email)
  }

  function assignHandler() {
    const randomizedPeople = randomizePeople(people)
    const vectors = getVectors(randomizedPeople, rules)
    vectors.forEach(vector => {
      sendEmail(
        vector.from,
        getPerson(vector.from).name,
        getPerson(vector.to).name,
        exchangeName,
        contactName,
        contactEmail,
        message,
      )
    })
  }

  return (
    <div>
      <Head>
        <title>Exchanging.gifts - App</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Gift exchange config</div>
      <div>
        <div>Group settings</div>
        <div>{exchangeName}</div>
        <div>{contactName}</div>
        <div>{contactEmail}</div>
        <div>Set exchange name</div>
        <form onSubmit={setExchangeHandler}>
          <FormControl isRequired>
            <FormLabel>Exchange name</FormLabel>
            <Input type="text" placeholder="Christmas 2022" value={exchangeNameInput} onChange={(e) => setExchangeNameInput(e.target.value)} />
            <FormHelperText>The name can be anything you like.</FormHelperText>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
        <div>Set contact info</div>
        <form onSubmit={setContactHandler}>
          <FormControl isRequired>
            <FormLabel>Contact name</FormLabel>
            <Input type="text" placeholder="Jane Doe" value={contactNameInput} onChange={(e) => setContactNameInput(e.target.value)} />
            <FormHelperText>This will be the person who can answer questions about this gift exchange.</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contact email</FormLabel>
            <Input type="email" placeholder="jane.doe@example.com" value={contactEmailInput} onChange={(e) => setContactEmailInput(e.target.value)} />
            <FormHelperText>Make sure this email is active.</FormHelperText>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div>
        <div>People</div>
        <div>
          {people.map(person => (
            <div key={person.email}>
              <div>{person.name}</div>
              <div>{person.email}</div>
            </div>
          ))}
        </div>
        <div>Create person</div>
        <form onSubmit={createPersonHandler}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="John Doe" value={personInput.name} onChange={(e) => setPersonInput({ ...personInput, name: e.target.value })} />
            <FormHelperText>Can be first name, or first and last name, or even a nickname.</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="john.doe@example.com" value={personInput.email} onChange={(e) => setPersonInput({ ...personInput, email: e.target.value })} />
            <FormHelperText>Make sure this is an active email address—this person will be getting his match at this address.</FormHelperText>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div>
        <div>Rules</div>
        <div>
          {rules.map(rule => (
            <div key={`${rule.from}-${rule.to}-${rule.type}`}>
              <div>{rule.from}</div>
              <div>{rule.to}</div>
              <div>{rule.type}</div>
            </div>
          ))}
        </div>
        <div>Create rule</div>
        <form onSubmit={createRuleHandler}>
          <FormControl isRequired>
            <FormLabel>From</FormLabel>
            <Select placeholder="Select a person" value={ruleInput.from} onChange={(e) => setRuleInput({ ...ruleInput, from: e.target.value })}>
              {people.map(person => (
                <option value={person.email} key={person.email}>{person.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>To</FormLabel>
            <Select placeholder="Select a person" value={ruleInput.to} onChange={(e) => setRuleInput({ ...ruleInput, to: e.target.value })}>
              {people.map(person => (
                <option value={person.email} key={person.email}>{person.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select placeholder="Select a type" value={ruleInput.type} onChange={(e) => setRuleInput({ ...ruleInput, type: e.target.value })}>
              {ruleTypes.map(ruleTypes => (
                <option value={ruleTypes.id} key={ruleTypes.id}>{ruleTypes.label}</option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div>
      <div>Message</div>
      <div>
        {message}
      </div>
      <div>Set message</div>
        <form onSubmit={createMessageHandler}>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Write an optional message here…" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
            <FormHelperText>For example, tell your group what the price range is, or what date and time you'll be exchanging your gifts.</FormHelperText>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <Button onClick={assignHandler}>Assign</Button>
    </div>
  )
}
