import Head from 'next/head'
import { useState, useContext } from 'react'
import { getVectors } from '../helpers/assign'
import { sendEmail } from '../helpers/sendEmail'
import { CheckIcon, XMarkIcon, QueueListIcon } from '@heroicons/react/24/outline'
import { PanelContext } from './_app'
import { PANELS } from '../helpers/constants'
import Panel from '../components/ui/panel'
import InputBox from '../components/ui/inputBox'
import Button from '../components/ui/button'
import SmallButton from '../components/ui/smallButton'
import { ICON_SIZE } from '../helpers/constants'

const emptyPersonInput = { name: '', email: '' }
const emptyRuleInput = { from: '', to: '', type: '' }
const ruleTypes = [
  { id: 'inclusion', label: 'must give to' },
  { id: 'exclusion', label: 'must not give to' },
]

export default function App() {
  const [exchangeNameStatus, setExchangeNameStatus] = useState('blank')
  const [exchangeNameInput, setExchangeNameInput] = useState('')
  const [exchangeName, setExchangeName] = useState('')
  const [contactStatus, setContactStatus] = useState('blank')
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

  const panelContext = useContext(PanelContext)

  function setExchangeSubmitHandler(e) {
    e.preventDefault()
    setExchangeName(exchangeNameInput)
    exchangeNameInput === '' ? setExchangeNameStatus('blank') : setExchangeNameStatus('set')
  }

  function setExchangeCancelHandler() {
    exchangeName === '' ? setExchangeNameStatus('blank') : setExchangeNameStatus('set')
    setExchangeNameInput(exchangeName)
  }

  function setContactHandler(e) {
    e.preventDefault()
    setContactName(contactNameInput)
    setContactEmail(contactEmailInput)
    setContactStatus('set')
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
    const vectors = getVectors(people, rules)
    if (vectors === -1) {
      console.log(`Can't generate matches that don't break any of the rules that have been set. Try making the rules less restrictive (hint: there's probably some kind of contradiction in the rules!).`)
    }
    else {
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
  }

  return (
    <>
      <Head>
        <title>Exchanging.gifts - App</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {panelContext.panelState === PANELS[0] && (
        <Panel
          header="Intro"
          body="Intro"
        />
      )}
      {panelContext.panelState === PANELS[1] && (
        <Panel
          header="Settings"
          body={
            <div className="space-y-4">
              <InputBox>
                {exchangeNameStatus === 'blank' && (
                  <Button
                    icon={<QueueListIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />}
                    label="Set group name"
                    callback={() => setExchangeNameStatus('edit')}
                    color="white"
                  />
                )}
                {exchangeNameStatus === 'edit' && (
                  <form onSubmit={setExchangeSubmitHandler}>
                    <div className="flex items-center justify-between">
                      <label htmlFor="groupName">Set group name</label>
                      <div className="flex gap-2">
                        <SmallButton
                          type="submit"
                          icon={<CheckIcon className={`w-4 h-4`} />}
                          color="white"
                        />
                        <SmallButton
                          icon={<XMarkIcon className={`w-4 h-4`} />}
                          callback={(e) => setExchangeCancelHandler(e)}
                          color="white"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      id="groupName"
                      placeholder="Group name"
                      value={exchangeNameInput}
                      onChange={(e) => setExchangeNameInput(e.target.value)}
                      className="border-0 bg-transparent w-full my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                      autoFocus
                    />
                    <div className="text-slate-500 text-xs">The name can be anything you like.</div>
                  </form>
                )}
                {exchangeNameStatus === 'set' && (
                  <>
                    <label htmlFor="groupName">Group name</label>
                    <div className="text-lg cursor-pointer my-2" onClick={() => setExchangeNameStatus('edit')}>
                      {exchangeName}
                    </div>
                  </>
                )}
              </InputBox>
              <InputBox>
                {contactStatus === 'blank' && (
                  <Button
                    icon={<QueueListIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />}
                    label="Set group contact person"
                    callback={() => setContactStatus('edit')}
                    color="white"
                  />
                )}
                {contactStatus === 'edit' && (
                  <form onSubmit={setContactHandler}>
                    <div className="flex items-center justify-between">
                      <label htmlFor="contactName">Set contact person</label>
                      <div className="flex gap-2">
                        <SmallButton
                          type="submit"
                          icon={<CheckIcon className={`w-4 h-4`} />}
                          color="white"
                        />
                        <SmallButton
                          icon={<XMarkIcon className={`w-4 h-4`} />}
                          callback={() => contactName === contactEmail === '' ? setContactStatus('blank') : setContactStatus('set')}
                          color="white"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      id="contactName"
                      placeholder="Contact name"
                      value={contactNameInput}
                      onChange={(e) => setContactNameInput(e.target.value)}
                      className="border-0 bg-transparent w-full my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                      autoFocus
                    />
                    <div className="text-slate-500 text-xs">The person's name.</div>
                    <input
                      type="text"
                      id="contactEmail"
                      placeholder="Contact email"
                      value={contactEmailInput}
                      onChange={(e) => setContactEmailInput(e.target.value)}
                      className="border-0 bg-transparent w-full my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                    />
                    <div className="text-slate-500 text-xs">Make sure this email is correct.</div>
                  </form>
                )}
                {contactStatus === 'set' && (
                  <>
                    <label htmlFor="groupName">Group contact person</label>
                    <div className="text-lg cursor-pointer my-2" onClick={() => setContactStatus('edit')}>
                      {contactName}
                    </div>
                    <div className="text-lg cursor-pointer my-2" onClick={() => setContactStatus('edit')}>
                      {contactEmail}
                    </div>
                  </>
                )}
              </InputBox>
              {/* <div>Set contact info</div>
              <form onSubmit={setContactHandler}>
                <label>Contact name</label>
                <input type="text" placeholder="Jane Doe" value={contactNameInput} onChange={(e) => setContactNameInput(e.target.value)} />
                <div>This will be the person who can answer questions about this gift exchange.</div>
                <label>Contact email</label>
                <input type="email" placeholder="jane.doe@example.com" value={contactEmailInput} onChange={(e) => setContactEmailInput(e.target.value)} />
                <div>Make sure this email is active.</div>
                <button type="submit">Submit</button>
              </form> */}
            </div>
          }
        />
      )}
      {panelContext.panelState === PANELS[2] && (
        <>
          <div size="lg">People</div>
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
            <label>Name</label>
            <input type="text" placeholder="John Doe" value={personInput.name} onChange={(e) => setPersonInput({ ...personInput, name: e.target.value })} />
            <div>Can be first name, or first and last name, or even a nickname.</div>
            <label>Email address</label>
            <input type="email" placeholder="john.doe@example.com" value={personInput.email} onChange={(e) => setPersonInput({ ...personInput, email: e.target.value })} />
            <div>Make sure this is an active email address—this person will be getting his match at this address.</div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {panelContext.panelState === PANELS[3] && (
        <>
          <div size="lg">Rules</div>
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
            <label>From</label>
            <select placeholder="Select a person" value={ruleInput.from} onChange={(e) => setRuleInput({ ...ruleInput, from: e.target.value })}>
              {people.map(person => (
                <option value={person.email} key={person.email}>{person.name}</option>
              ))}
            </select>
            <label>To</label>
            <select placeholder="Select a person" value={ruleInput.to} onChange={(e) => setRuleInput({ ...ruleInput, to: e.target.value })}>
              {people.map(person => (
                <option value={person.email} key={person.email}>{person.name}</option>
              ))}
            </select>
            <label>Type</label>
            <select placeholder="Select a type" value={ruleInput.type} onChange={(e) => setRuleInput({ ...ruleInput, type: e.target.value })}>
              {ruleTypes.map(ruleTypes => (
                <option value={ruleTypes.id} key={ruleTypes.id}>{ruleTypes.label}</option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {panelContext.panelState === PANELS[4] && (
        <>
          <div>
            <div size="lg">Message</div>
            <div>
              {message}
            </div>
            <div>Set message</div>
            <form onSubmit={createMessageHandler}>
              <label>Message</label>
              <textarea placeholder="Write an optional message here…" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
              <div>For example, tell your group what the price range is, or what date and time you'll be exchanging your gifts.</div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <button onClick={assignHandler} size="lg">Assign & send emails</button>
        </>
      )}
    </>
  )
}
