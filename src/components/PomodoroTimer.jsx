import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  Center,
  HStack,
} from '@chakra-ui/react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userTime, setUserTime] = useState(25);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) =>
              prevMinutes > 0 ? prevMinutes - 1 : 0
            );
            return 59;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    // Finaliza o timer quando o tempo chega a 0
    if (minutes === 0 && seconds === 0 && isActive) {
      alert('Tempo esgotado!');
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(userTime);
    setSeconds(0);
  };

  const handleTimeChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 0); // Evita valores inválidos
    setUserTime(value);
    setMinutes(value);
    setSeconds(0);
  };

  return (
    <Center>
      <Box width="100%" maxWidth="400px" p="4">
        <Text fontSize="4xl" mb="4" textAlign="center">
          {String(minutes).padStart(2, '0')} :{' '}
          {String(seconds).padStart(2, '0')}
        </Text>
        <FormControl mb="4">
          <FormLabel>Definir tempo (minutos)</FormLabel>
          <Input
            type="number"
            value={userTime}
            onChange={handleTimeChange}
            isDisabled={isActive}
          />
        </FormControl>
        <HStack spacing="4">
          <Button
            onClick={toggleTimer}
            colorScheme={isActive ? 'red' : 'green'}
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button colorScheme="gray" onClick={resetTimer}>
            Reiniciar
          </Button>
        </HStack>
      </Box>
    </Center>
  );
};

export default PomodoroTimer;
