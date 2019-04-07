/*
Exercise Goal:
    - The goal of this exercise is to show us how you apply software engineering
    principles to create a maintainable software solution.
    How to approach this:
            - Don't worry about persistence. It would make sense here, but for this
            exercise only use in-memory data structures.
            - Don't worry about tricks or "gotchyas", as there aren't any.
            - Just focus on writing clean maintainable code.
Specification:
    Create a class LeaderBoard whose interface includes the following methods:
    Method Name: add_score
        - Add a new score to the player's average. If a player doesn't exist in the
        LeaderBoard, they will be automatically added.
        Args:
                player_id (Integer): The player's ID.
                score (Integer): The score to record for the player
        Returns:
                Double: The new average score for the given player
    Method Name: top
        - Get the top player_ids on the leaderboard ordered by their average scores
        from highest to lowest
        Args:
                num_players (Integer): The maximum number of player_ids to return
        Returns:
                List<Integer>: a list of player_ids
    Method Name: reset
        - Removes any scoring information for a player, effectively
        resetting them to 0
        Args:
                player_id (Integer): The player's ID.
Example Usage:
    // Create a new LeaderBoard Instance
    LeaderBoard leader_board = new LeaderBoard();
    // Add scores for players to the LeaderBoard
    leader_board.add_score(1, 50); // 50.0
    leader_board.add_score(2, 80); // 80.0
    leader_board.add_score(2, 70); // 75.0
    leader_board.add_score(2, 60); // 70.0
    leader_board.add_score(3, 90); // 90.0
    leader_board.add_score(3, 85); // 87.5
    // Get top positions for the leaderboard
    leader_board.top(3); // [3, 2, 1]
    leader_board.top(2); // [3, 2]
    leader_board.top(1); // [3]
    // Reset a player 3's scores
    leader_board.reset(3); // void
    // Player 3 is now at the bottom of the leaderboard
    leader_board.top(3); // [2, 1, 3]
Expected values
    - Player IDs will always be positive integers small enough to be
    stored as a signed 32-bit integer Scores are integers ranging from 0-100
We have provided stubbed out code and tests for you below. Please note that these tests are not exhaustive and do not cover all corner cases. We recommend extending the given tests to ensure your code is correct.
*/


// Your code goes here. Feel free to make helper classes if needed
class Player{

  constructor(score){
    this.scores=[score]
  }

  add_score(new_score){
    this.scores.push(new_score)
  }

  reset(){ this.scores=[0]}

  average(){
    let scores=this.scores
    return scores.reduce((sum, element) => sum + element, 0) / scores.length; }
}

class LeaderBoard {

  constructor(){
      this.players={};
  }

    add_score = (player_id, score) => {
       if (score<0 || score>100) {return "invalid score"}
         if (!Number.isInteger(player_id) || player_id<0) {return "invalid id"}
        if (this.players[player_id]){
              this.players[player_id].add_score(score)
    } else {
      let player=new Player(score)
     this.players={...this.players, [player_id]: player}
    }

    return this.players[player_id].average()
  };

  top(num_players){
    if (num_players<0 || !Number.isInteger(num_players)) { return "invalid number"}
    let topList=Object.keys(this.players).map(key=>
      [Number(key), this.players[key].average()]).sort((a,b)=>b[1]-a[1]).map(element=>element[0]).slice(0,num_players)

    return topList

  };

  reset(player_id){
    if (this.players[player_id]) {
      this.players[player_id].reset()
    } else{
     return "invalid id"
  }

  };
}

// Test code here


var leader_board = new LeaderBoard()
leader_board.add_score(1, 50)
console.log(leader_board.add_score(2, 80) == 80)
console.log(leader_board.add_score(2, 70) == 75)
console.log(leader_board.add_score(2, 60) == 70)
console.log('Add score should return the average. test with 1 score')
console.log(leader_board.add_score(3, 90) == 90)
console.log('Add score should return the average. test with 2 scores')
console.log(leader_board.add_score(3, 85) == 87.5)
console.log('Top 3 [' + leader_board.top(3) + '] should equal [3, 2, 1]:')
console.log(array_equals(leader_board.top(3), [3, 2, 1]))
console.log('Top 2 [' + leader_board.top(2) + '] should equal [3, 2]:')
console.log(array_equals(leader_board.top(2), [3, 2]))
leader_board.reset(3)
console.log('After reset top 3 [' + leader_board.top(3) + '] should equal [2, 1, 3]')
console.log(array_equals(leader_board.top(3), [2, 1, 3]))
