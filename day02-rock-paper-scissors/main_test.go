package main

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestCorrectScoringOfRound(t *testing.T) {
	require.Equal(t, 8, GetPoints(Rock, Paper))
	require.Equal(t, 1, GetPoints(Paper, Rock))
	require.Equal(t, 6, GetPoints(Scissors, Scissors))
	require.Equal(t, 6, GetPoints(Scissors, Scissors))
}
