package main

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type player struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Position string `json:"position"`
	Games    int    `json:"games"`
	Goals    int    `json:"goals"`
}

var players = []player{
	{ID: "1", Name: "Superman", Position: "Midfielder", Games: 144, Goals: 2},
	{ID: "2", Name: "Batman", Position: "Goalkeeper", Games: 123, Goals: 5},
	{ID: "3", Name: "Ironman", Position: "Midfielder", Games: 3, Goals: 6},
	{ID: "4", Name: "Catwoman", Position: "Forward", Games: 1, Goals: 0},
	{ID: "5", Name: "Hulk", Position: "Defender", Games: 45, Goals: 6},
	{ID: "6", Name: "Peter Pan", Position: "Midfielder", Games: 555555, Goals: 6},
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
	//router.Use(cors.Default())
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Replace with your frontend's URL
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	router.GET("/player", getPlayer)
	router.GET("/player/:id", playerById)
	router.POST("/player", createPlayer)
	//router.PATCH("/checkout", checkoutBook)
	//router.PATCH("/return", returnBook)
	router.Run("localhost:8081")
}
