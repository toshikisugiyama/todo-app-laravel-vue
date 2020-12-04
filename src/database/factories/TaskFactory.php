<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $statuses = ['waiting', 'done'];
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->jobTitle,
            'note' => $this->faker->realText($this->faker->numberBetween(10, 20)),
            'date' => $this->faker->dateTimeBetween($startDate='-1 year', $endDate='5 years', $timezone=null),
            'status' => $statuses[$this->faker->numberBetween($min=0, $max=count($statuses)-1)]
        ];
    }
}
