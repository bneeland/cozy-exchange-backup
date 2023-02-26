import Head from 'next/head'
import { useState, useContext } from 'react'
import { getVectors } from '../helpers/assign'
import { sendEmail } from '../helpers/sendEmail'
import { CheckIcon, XMarkIcon, QueueListIcon, UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { PanelContext } from './_app'
import { PANELS } from '../helpers/constants'
import Panel from '../components/ui/panel'
import InputBox from '../components/ui/inputBox'
import Button from '../components/ui/button'
import SmallButton from '../components/ui/smallButton'
import { ICON_SIZE } from '../helpers/constants'

const EMPTY_PARTICIPANT_INPUT = { name: '', email: '' }
const EMPTY_RULE_INPUT = { from: '', to: '', type: '' }
const RULE_TYPES = [
  { id: 'inclusion', label: 'must give to' },
  { id: 'exclusion', label: 'must not give to' },
]

export default function App() {
  const [exchangeNameStatus, setExchangeNameStatus] = useState('blank')
  const [exchangeNameInput, setExchangeNameInput] = useState('')
  const [exchangeName, setExchangeName] = useState('')
  const [contactStatus, setContactStatus] = useState('blank')
  const [contactUpdateIndex, setContactUpdateIndex] = useState(0)
  const [contactNameInput, setContactNameInput] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmailInput, setContactEmailInput] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [createParticipantStatus, setCreateParticipantStatus] = useState('blank')
  const [participantInput, setParticipantInput] = useState(EMPTY_PARTICIPANT_INPUT)
  const [participantUpdateIndex, setParticipantUpdateIndex] = useState(0)
  const [participantUpdateInput, setParticipantUpdateInput] = useState(EMPTY_PARTICIPANT_INPUT)
  const [participants, setParticipants] = useState([])
  const [participantUpdateEmail, setParticipantUpdateEmail] = useState('')
  const [ruleInput, setRuleInput] = useState(EMPTY_RULE_INPUT)
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
    setExchangeNameInput(exchangeName)
    exchangeName === '' ? setExchangeNameStatus('blank') : setExchangeNameStatus('set')
  }

  function setContactHandler(e) {
    e.preventDefault()
    contactNameInput === '' && contactEmailInput === '' ? setContactStatus('blank') : setContactStatus('set')
    setContactName(contactNameInput)
    setContactEmail(contactEmailInput)
  }

  function setContactCancelHandler() {
    contactName === '' && contactEmail === '' ? setContactStatus('blank') : setContactStatus('set')
    setContactNameInput(contactName)
    setContactEmailInput(contactEmail)
  }

  async function createParticipantHandler(e) {
    e.preventDefault()
    await setCreateParticipantStatus('blank')
    setCreateParticipantStatus('update')
    setParticipants([...participants, participantInput])
    setParticipantInput(EMPTY_PARTICIPANT_INPUT)
  }

  function createParticipantCancelHandler() {
    setCreateParticipantStatus('blank')
    setParticipantInput(EMPTY_PARTICIPANT_INPUT)
  }

  function handleUpdateParticipant(participantEmail, fieldIndex) {
    setParticipantUpdateEmail(participantEmail)
    setParticipantUpdateInput(getParticipant(participantEmail))
    setParticipantUpdateIndex(fieldIndex)
  }

  function updateParticipantHandler(e) {
    e.preventDefault()
    setParticipantUpdateEmail(null)
    const _participants = participants.slice()
    const participantIndex = _participants.indexOf(getParticipant(participantUpdateEmail))
    _participants[participantIndex] = participantUpdateInput
    setParticipants(_participants)
    setParticipantUpdateInput(EMPTY_PARTICIPANT_INPUT)
  }

  function updateParticipantCancelHandler() {
    setParticipantUpdateEmail(null)
    setParticipantUpdateInput(EMPTY_PARTICIPANT_INPUT)
  }

  function createRuleHandler(e) {
    e.preventDefault()
    setRules([...rules, ruleInput])
    setRuleInput(EMPTY_RULE_INPUT)
  }

  function createMessageHandler(e) {
    e.preventDefault()
    setMessage(messageInput)
    setMessageInput('')
  }

  function getParticipant(email) {
    return participants.find(participant => participant.email === email)
  }

  function assignHandler() {
    const vectors = getVectors(participants, rules)
    if (vectors === -1) {
      console.log(`Can't generate matches that don't break any of the rules that have been set. Try making the rules less restrictive (hint: there's probably some kind of contradiction in the rules!).`)
    }
    else {
      vectors.forEach(vector => {
        sendEmail(
          vector.from,
          getParticipant(vector.from).name,
          getParticipant(vector.to).name,
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
                    callback={() => setExchangeNameStatus('update')}
                    color="white"
                  />
                )}
                {exchangeNameStatus === 'update' && (
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
                    <div className="text-lg cursor-pointer my-2" onClick={() => setExchangeNameStatus('update')}>
                      {exchangeName}
                    </div>
                  </>
                )}
              </InputBox>
              <InputBox>
                {contactStatus === 'blank' && (
                  <Button
                    icon={<UserCircleIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />}
                    label="Set group contact participant"
                    callback={() => setContactStatus('update')}
                    color="white"
                  />
                )}
                {contactStatus === 'update' && (
                  <form onSubmit={setContactHandler}>
                    <div className="flex items-center justify-between">
                      <label htmlFor="contactName">Set contact person for this gift exchange</label>
                      <div className="flex gap-2">
                        <SmallButton
                          type="submit"
                          icon={<CheckIcon className={`w-4 h-4`} />}
                          color="white"
                        />
                        <SmallButton
                          icon={<XMarkIcon className={`w-4 h-4`} />}
                          callback={(e) => setContactCancelHandler(e)}
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
                      autoFocus={contactUpdateIndex === 0}
                    />
                    <div className="text-slate-500 text-xs">The contact person's name.</div>
                    <input
                      type="text"
                      id="contactEmail"
                      placeholder="Contact email"
                      value={contactEmailInput}
                      onChange={(e) => setContactEmailInput(e.target.value)}
                      className="border-0 bg-transparent w-full my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                      autoFocus={contactUpdateIndex === 1}
                    />
                    <div className="text-slate-500 text-xs">Make sure this email is correct.</div>
                  </form>
                )}
                {contactStatus === 'set' && (
                  <>
                    <label htmlFor="groupName">Group contact participant</label>
                    <div className="text-lg cursor-pointer my-2" onClick={() => {setContactStatus('update'); setContactUpdateIndex(0)}}>
                      {contactName}
                    </div>
                    <div className="text-lg cursor-pointer my-2" onClick={() => {setContactStatus('update'); setContactUpdateIndex(1)}}>
                      {contactEmail}
                    </div>
                  </>
                )}
              </InputBox>
            </div>
          }
        />
      )}
      {panelContext.panelState === PANELS[2] && (
        <Panel
          header="Participants"
          body={
            <div className="space-y-4">
              <InputBox>
                {createParticipantStatus === 'blank' && (
                  <Button
                    icon={<UserPlusIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />}
                    label="Add a participant"
                    callback={() => setCreateParticipantStatus('update')}
                    color="white"
                  />
                )}
                {createParticipantStatus === 'update' && (
                  <form onSubmit={createParticipantHandler}>
                    <div className="flex items-center justify-between">
                      <label htmlFor="participantName">Add participant</label>
                      <div className="flex gap-2">
                        <SmallButton
                          type="submit"
                          icon={<CheckIcon className={`w-4 h-4`} />}
                          color="white"
                        />
                        <SmallButton
                          icon={<XMarkIcon className={`w-4 h-4`} />}
                          callback={(e) => createParticipantCancelHandler(e)}
                          color="white"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      id="participantName"
                      placeholder="Name"
                      value={participantInput.name}
                      onChange={(e) => setParticipantInput({ ...participantInput, name: e.target.value })}
                      className="border-0 bg-transparent w-full my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                      autoFocus
                    />
                    <div className="text-slate-500 text-xs">Can be an individual, a couple, a family, or a group. Either way, this will be treated as a single participant in the exchange.</div>
                    <input
                      type="text"
                      id="participantEmail"
                      placeholder="Email"
                      value={participantInput.email}
                      onChange={(e) => setParticipantInput({ ...participantInput, email: e.target.value })}
                      className="border-0 bg-transparent w-full my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                    />
                    <div className="text-slate-500 text-xs">Provide one valid email for the participant or participant group.</div>
                  </form>
                )}
              </InputBox>
              {participants.length > 0 && <InputBox>
                <div className="flex flex-col gap-2">
                  {participants.map(participant => (
                    participantUpdateEmail === participant.email ? (
                      <div key={participant.email}>
                        <form onSubmit={updateParticipantHandler}>
                          <div
                            className="cursor-pointer flex items-center"
                          >
                            <input
                              type="text"
                              id="participantName"
                              placeholder="Name"
                              value={participantUpdateInput.name}
                              onChange={(e) => setParticipantUpdateInput({ ...participantUpdateInput, name: e.target.value })}
                              className="border-0 bg-transparent w-4/12 my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                              autoFocus={participantUpdateIndex === 0}
                            />
                            <input
                              type="text"
                              id="participantEmail"
                              placeholder="Email"
                              value={participantUpdateInput.email}
                              onChange={(e) => setParticipantUpdateInput({ ...participantUpdateInput, email: e.target.value })}
                              className="border-0 bg-transparent w-6/12 my-2 outline-none text-xl placeholder:text-slate-400 border-b"
                              autoFocus={participantUpdateIndex === 1}
                            />
                            <div className="flex gap-2 justify-end w-2/12">
                              <SmallButton
                                type="submit"
                                icon={<CheckIcon className={`w-4 h-4`} />}
                                color="white"
                              />
                              <SmallButton
                                icon={<XMarkIcon className={`w-4 h-4`} />}
                                callback={(e) => updateParticipantCancelHandler(e)}
                                color="white"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    ) : (
                        <div
                          key={participant.email}
                          className="cursor-pointer flex items-center"
                        >
                          <div
                            className="w-4/12 text-lg"
                            onClick={() => handleUpdateParticipant(participant.email, 0)}
                          >
                            {participant.name}
                          </div>
                          <div
                            className="w-6/12"
                            onClick={() => handleUpdateParticipant(participant.email, 1)}
                          >
                            {participant.email}
                          </div>
                          <div className="w-2/12" />
                        </div>
                    )
                  ))}
                </div>
              </InputBox>}
            </div>
          }
        />
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
            <select placeholder="Select a participant" value={ruleInput.from} onChange={(e) => setRuleInput({ ...ruleInput, from: e.target.value })}>
              {participants.map(participant => (
                <option value={participant.email} key={participant.email}>{participant.name}</option>
              ))}
            </select>
            <label>To</label>
            <select placeholder="Select a participant" value={ruleInput.to} onChange={(e) => setRuleInput({ ...ruleInput, to: e.target.value })}>
              {participants.map(participant => (
                <option value={participant.email} key={participant.email}>{participant.name}</option>
              ))}
            </select>
            <label>Type</label>
            <select placeholder="Select a type" value={ruleInput.type} onChange={(e) => setRuleInput({ ...ruleInput, type: e.target.value })}>
              {RULE_TYPES.map(ruleType => (
                <option value={ruleType.id} key={ruleType.id}>{ruleType.label}</option>
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
