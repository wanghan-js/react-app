import { TodoCreator } from '@/features/todo/components/TodoCreator'
import { TodoList } from '@/features/todo/components/TodoList'
import { Box, Flex } from '@chakra-ui/react'

export function Todo() {
  return (
    <Flex
      borderRadius={'32px'}
      boxShadow={'0 0 4px rgba(0, 23, 71, 0.15)'}
      w={'1000px'}
      h={'670px'}
      alignSelf={'flex-start'}
      mt={20}
      direction={'column'}
      align={'center'}
    >
      <Box fontWeight={'600'} fontSize={'48px'} lineHeight={'57px'} color={'#11175e'}>
        Daily To Do List
      </Box>
      <TodoCreator />
      <TodoList />
      <footer>
        <div>3 item selected</div>
        <button>Clear All</button>
      </footer>
    </Flex>
  )
}
