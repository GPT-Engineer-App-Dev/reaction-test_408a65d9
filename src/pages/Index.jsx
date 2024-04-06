import React, { useState, useEffect } from "react";
import { Box, Button, Center, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { FaHandPointer } from "react-icons/fa";

const Index = () => {
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'ready', 'click'
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (gameState === "ready") {
      timer = setTimeout(
        () => {
          setGameState("click");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 5000) + 1000,
      ); // Wait 1-5 seconds
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleStartClick = () => {
    setGameState("ready");
  };

  const handleClick = () => {
    if (gameState === "click") {
      setEndTime(Date.now());
      setGameState("waiting");
      const reactionTime = Date.now() - startTime;
      toast({
        title: "Reaction time",
        description: `Your reaction time is ${reactionTime}ms`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else if (gameState === "ready") {
      clearTimeout();
      setGameState("waiting");
      toast({
        title: "Too soon!",
        description: "Wait for the screen to change before clicking.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh" bg="gray.100">
      <VStack spacing={8}>
        <Heading>Reaction Time Test</Heading>
        <Box w="300px" h="300px" bg={gameState === "click" ? "green.400" : "red.400"} borderRadius="md" display="flex" alignItems="center" justifyContent="center" onClick={handleClick}>
          {gameState === "waiting" && (
            <Button colorScheme="blue" onClick={handleStartClick}>
              Start
            </Button>
          )}
          {gameState === "ready" && <Text>Wait for green...</Text>}
          {gameState === "click" && <FaHandPointer size="3em" color="white" />}
        </Box>
        {endTime > 0 && <Text>Your last reaction time: {endTime - startTime}ms</Text>}
      </VStack>
    </Center>
  );
};

export default Index;
