import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' && num !== '.') {
      setDisplay(num);
    } else {
      if (num === '.' && !hasDecimal) {
        setDisplay(display + num);
        setHasDecimal(true);
      } else if (num !== '.') {
        setDisplay(display + num);
      }
    }
  };

  const handleOperator = (operator: string) => {
    setEquation(display + ' ' + operator + ' ');
    setDisplay('0');
    setHasDecimal(false);
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
      setHasDecimal(result.toString().includes('.'));
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setHasDecimal(false);
  };

  const renderButton = (text: string, type: 'number' | 'operator' | 'equals' = 'number') => {
    const isWide = text === '0';
    return (
      <TouchableOpacity
        style={[
          styles.button,
          isWide && styles.wideButton,
          type === 'operator' && styles.operatorButton,
          type === 'equals' && styles.equalsButton,
        ]}
        onPress={() => {
          if (type === 'number') handleNumber(text);
          else if (type === 'operator') handleOperator(text);
          else if (type === 'equals') calculate();
        }}>
        <LinearGradient
          colors={
            type === 'operator'
              ? ['#FF9A9E', '#FAD0C4']
              : type === 'equals'
              ? ['#4facfe', '#00f2fe']
              : ['#ffffff', '#f8f9fa']
          }
          style={[styles.gradient, isWide && styles.wideButton]}>
          <Text
            style={[
              styles.buttonText,
              type === 'operator' && styles.operatorText,
              type === 'equals' && styles.equalsText,
            ]}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.equation}>{equation}</Text>
        <Text style={styles.display}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('÷', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('×', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('-', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('+', 'operator')}
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clear}>
            <LinearGradient colors={['#FF9A9E', '#FAD0C4']} style={styles.gradient}>
              <Text style={styles.operatorText}>C</Text>
            </LinearGradient>
          </TouchableOpacity>
          {renderButton('=', 'equals')}
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const buttonWidth = (width - 60) / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  displayContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  equation: {
    fontSize: 24,
    color: '#666',
    marginBottom: 10,
  },
  display: {
    fontSize: 48,
    fontWeight: '200',
    color: '#333',
  },
  buttonContainer: {
    flex: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: buttonWidth,
    height: buttonWidth,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  wideButton: {
    width: buttonWidth * 2 + 10,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 28,
    color: '#333',
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: '#FF9A9E',
  },
  operatorText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
  equalsButton: {
    backgroundColor: '#4facfe',
    width: buttonWidth * 3 + 20,
  },
  equalsText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#FF9A9E',
  },
});