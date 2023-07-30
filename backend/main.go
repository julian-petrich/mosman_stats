package main

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type player struct {
	ID    string `json:"id"`
	Name  string `json:"title"`
	Games string `json:"author"`
	Goals int    `json:"quantity"`
}

var players = []player{
	{ID: "1", Name: "In Search of Lost Time", Games: "Marcel Proust", Goals: 2},
	{ID: "2", Name: "The Great Gatsby", Games: "F. Scott Fitzgerald", Goals: 5},
	{ID: "3", Name: "War and Peace", Games: "Leo Tolstoy", Goals: 6},
}

func getPlayer(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, players)
}

func playerById(c *gin.Context) {
	id := c.Param("id")
	player, err := getPlayerById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Player not found."})
		return
	}

	c.IndentedJSON(http.StatusOK, player)
}

func getPlayerById(id string) (*player, error) {
	for i, b := range players {
		if b.ID == id {
			return &players[i], nil
		}
	}

	return nil, errors.New("player not found")
}

func createPlayer(c *gin.Context) {
	var newPlayer player

	if err := c.BindJSON(&newPlayer); err != nil {
		return
	}

	players = append(players, newPlayer)
	c.IndentedJSON(http.StatusCreated, newPlayer)
}

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,                               // Allow all origins (for testing purposes, not recommended in production)
		AllowMethods:    []string{"GET", "POST", "OPTIONS"}, // Add the OPTIONS method here
		// Add other CORS options if needed
	}))
	router.GET("/player", getPlayer)
	router.GET("/player/:id", playerById)
	router.POST("/player", createPlayer)
	//router.PATCH("/checkout", checkoutBook)
	//router.PATCH("/return", returnBook)
	router.Run("localhost:8081")
}
