import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Music, Plus, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
      toast({
        title: "🎵 New track added!",
        description: "Your todo has been added to the playlist",
      });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "🗑️ Track removed",
      description: "Todo deleted from your playlist",
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music className="w-8 h-8 text-primary neon-glow" />
          <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Beat List
          </h1>
          <Volume2 className="w-8 h-8 text-accent neon-glow-accent" />
        </div>
        <p className="text-muted-foreground">
          Your musical productivity playlist • {completedCount}/{todos.length} tracks completed
        </p>
      </div>

      {/* Add Todo Form */}
      <Card className="glass-card neon-glow p-6">
        <div className="flex gap-3">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new track to your productivity playlist..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1 bg-secondary/50 border-primary/30 focus:border-primary neon-glow"
          />
          <Button 
            onClick={addTodo}
            className="neon-glow hover:neon-glow-accent transition-all duration-300"
            size="icon"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <Card className="glass-card p-8 text-center">
            <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              Your playlist is empty. Add some beats to get started! 🎵
            </p>
          </Card>
        ) : (
          todos.map((todo) => (
            <Card 
              key={todo.id} 
              className={`glass-card p-4 transition-all duration-300 hover:neon-glow group ${
                todo.completed ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${
                    todo.completed 
                      ? 'line-through text-muted-foreground' 
                      : 'text-foreground'
                  }`}>
                    {todo.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Added {todo.createdAt.toLocaleDateString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Progress */}
      {todos.length > 0 && (
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Playlist Progress</span>
            <span className="text-primary font-medium">
              {Math.round((completedCount / todos.length) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 neon-glow"
              style={{ width: `${(completedCount / todos.length) * 100}%` }}
            />
          </div>
        </Card>
      )}
    </div>
  );
}