import React from 'react'
import {Select, SelectSection, SelectItem} from "@heroui/select";

const SkillForm = () => {
  const levels = [
  {key: "beginner", label: "Beginner"},
  {key: "intermediate", label: "Intermediate"},
  {key: "advanced", label: "Advanced"},
 
];
  return (
   
      <form action="" className='flex flex-col gap-4 max-w-md'>
       
      <Select
      className="max-w-xs"
      items={levels}
      label="Skill Level"
      placeholder="Select a skill level"
      >
      {(level) => <SelectItem>{level.label}</SelectItem>}
    </Select>
        <input type="file" />
        <button type="submit">Add Skill</button>
      </form>
    
  )
}

export default SkillForm
