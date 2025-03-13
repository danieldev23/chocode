tmux new-session -d -s code-market
tmux send-keys -t code-market "./run-backend.sh" C-m
tmux split-window -h
tmux send-keys "./run-frontend.sh" C-m
tmux attach-session -t code-market
