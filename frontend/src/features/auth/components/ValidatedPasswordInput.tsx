import { Popover, PasswordInput, Progress } from '@mantine/core'
import { ReactNode, useState } from 'react'

import { passwordRequirements, testPasswordStrength } from '../shared/utils'
import PasswordRequirement from './PasswordRequirement'

type ValidatedPasswordInputProps = {
  required?: boolean;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: ReactNode;
  disabled: boolean;
}

function ValidatedPasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: ValidatedPasswordInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false)
  const [passwordValue, setPasswordValue] = useState(value) 
  const checks = passwordRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(passwordValue)}
    />
  ))

  const strength = testPasswordStrength(passwordValue)
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            required
            label={label}
            placeholder={placeholder}
            mt="md"
            value={passwordValue} 
            onChange={(event) => {
              setPasswordValue(event.currentTarget.value)
              onChange(event) 
            }}
            error={error}
            radius="md"
            disabled={disabled}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        {checks}
      </Popover.Dropdown>
    </Popover>
  )
}

export default ValidatedPasswordInput
