import { Todo } from '@/features/todo'
import { Box } from '@chakra-ui/react'

export function TodoPage() {
  return (
    <Box h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Todo />
    </Box>
  )
}
